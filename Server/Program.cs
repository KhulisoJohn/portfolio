using DotNetEnv;
using Serilog;
using Server.Data;
using Server.Extensions;
using Server.Health;
using Server.Services;

Env.Load();

var hash = Environment.GetEnvironmentVariable("ADMIN_PASSWORD_HASH") ?? "";

Console.WriteLine($"Hash length: {hash.Length}");
Console.WriteLine($"Hash prefix: {hash[..Math.Min(7, hash.Length)]}");
Console.WriteLine($"Leading/trailing whitespace: {hash != hash.Trim()}");

// Bootstrap logger: active only until the host builds, so we can also capture
// any exception that happens during configuration/startup itself.
Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Information()
    .WriteTo.Console()
    .CreateBootstrapLogger();

try
{
    Log.Information("Starting up Server");

    var builder = WebApplication.CreateBuilder(args);

    builder.Configuration.AddEnvironmentVariables();

    // ============================================================
    // Serilog
    // ============================================================

    builder.Host.UseSerilog((context, services, loggerConfig) => loggerConfig
        .ReadFrom.Configuration(context.Configuration)
        .ReadFrom.Services(services)
        .Enrich.FromLogContext()
        .WriteTo.Console()
        .WriteTo.File(
            path: "logs/log-.txt",
            rollingInterval: RollingInterval.Day,
            retainedFileCountLimit: 14,
            shared: true));


    // ============================================================
    // MongoDB
    // ============================================================

    var mongoConnectionString =
        Environment.GetEnvironmentVariable("MONGO_CONNECTION_STRING")
        ?? throw new Exception("MONGO_CONNECTION_STRING missing");

    var mongoDatabaseName =
        Environment.GetEnvironmentVariable("MONGO_DATABASE_NAME")
        ?? "PortfolioDb";

    builder.Services.Configure<MongoSettings>(options =>
    {
        options.ConnectionString = mongoConnectionString;
        options.DatabaseName = mongoDatabaseName;
    });


    // ============================================================
    // Health Checks
    // ============================================================

    builder.Services.AddHealthChecks()
        .AddCheck<MongoDbHealthCheck>("mongodb");


    // ============================================================
    // Brevo
    // ============================================================

    builder.Services.Configure<BrevoSettings>(options =>
    {
        options.ApiKey =
            Environment.GetEnvironmentVariable("BREVO_API_KEY") ?? "";

        options.SenderEmail =
            Environment.GetEnvironmentVariable("BREVO_SENDER_EMAIL") ?? "";

        options.SenderName =
            Environment.GetEnvironmentVariable("BREVO_SENDER_NAME") ?? "";

        options.RecipientEmail =
            Environment.GetEnvironmentVariable("BREVO_RECIPIENT_EMAIL") ?? "";
    });


    // ============================================================
    // JWT
    // ============================================================

    builder.Services.Configure<JwtSettings>(options =>
    {
        options.Secret =
            Environment.GetEnvironmentVariable("JWT_SECRET") ?? "";

        options.Issuer =
            Environment.GetEnvironmentVariable("JWT_ISSUER") ?? "";

        options.Audience =
            Environment.GetEnvironmentVariable("JWT_AUDIENCE") ?? "";

        options.ExpiryMinutes =
            int.Parse(
                Environment.GetEnvironmentVariable("JWT_EXPIRY_MINUTES")
                ?? "120"
            );
    });


    // ============================================================
    // Admin
    // ============================================================

    builder.Services.Configure<AdminUserSettings>(options =>
    {
        options.Username =
            Environment.GetEnvironmentVariable("ADMIN_USERNAME") ?? "";

        // NOTE: if this ever throws / logs a "malformed hash" warning at
        // startup, check .env for stray quotes around ADMIN_PASSWORD_HASH.
        options.PasswordHash =
            (Environment.GetEnvironmentVariable("ADMIN_PASSWORD_HASH") ?? "")
                .Trim()
                .Trim('"');
    });


    // ============================================================
    // Dependency Injection
    // ============================================================

    builder.Services.AddSingleton<PortfolioDbContext>();

    builder.Services.AddHttpClient<IEmailService, BrevoEmailService>();

    builder.Services.AddScoped<IContactService, ContactService>();
    builder.Services.AddScoped<IBlogService, BlogService>();
    builder.Services.AddScoped<IAuthService, AuthService>();


    // ============================================================
    // Controllers / Swagger
    // ============================================================

    builder.Services.AddControllers();

    builder.Services.AddEndpointsApiExplorer();

    builder.Services.AddSwaggerGen();


    // ============================================================
    // Rate Limiting
    // ============================================================

    builder.Services.AddApiRateLimiting();


    // ============================================================
    // CORS
    // ============================================================

    var allowedOrigins = builder.Configuration
        .GetSection("CorsSettings:AllowedOrigins")
        .Get<string[]>()
        ?? Array.Empty<string>();

    builder.Services.AddCors(options =>
    {
        options.AddPolicy("PortfolioFrontend", policy =>
        {
            policy
                .WithOrigins(allowedOrigins)
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
    });


    // ============================================================
    // JWT Authentication
    // ============================================================

    builder.Services.AddJwtAuthentication(builder.Configuration);


    // ============================================================
    // Build Application
    // ============================================================

    var app = builder.Build();


    // ============================================================
    // Request Logging
    // ============================================================

    app.UseSerilogRequestLogging();


    // ============================================================
    // Global Exception Handling
    // ============================================================

    if (app.Environment.IsDevelopment())
    {
        app.UseDeveloperExceptionPage();
    }
    else
    {
        // Outside Development, never leak stack traces to clients. Log the
        // full exception server-side and return a generic 500 instead.
        app.UseExceptionHandler(errorApp =>
        {
            errorApp.Run(async context =>
            {
                var feature = context.Features.Get<Microsoft.AspNetCore.Diagnostics.IExceptionHandlerFeature>();
                if (feature?.Error is { } ex)
                {
                    Log.Error(ex, "Unhandled exception on {Path}", context.Request.Path);
                }

                context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsync("{\"message\":\"An unexpected error occurred.\"}");
            });
        });
    }


    // ============================================================
    // Swagger
    // ============================================================

    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }


    // ============================================================
    // HTTPS
    // ============================================================

    // Disabled while testing HTTP locally
    // app.UseHttpsRedirection();


    // ============================================================
    // Middleware
    // ============================================================

    app.UseCors("PortfolioFrontend");

    app.UseRateLimiter();

    app.UseAuthentication();

    app.UseAuthorization();


    // ============================================================
    // API Endpoints
    // ============================================================

    app.MapControllers();


    // ============================================================
    // Health Check
    // ============================================================

    app.MapHealthChecks("/health");


    // ============================================================
    // Run
    // ============================================================

    app.Run();
}



catch (Exception ex)
{
    Log.Fatal(ex, "Server terminated unexpectedly during startup");
}
finally
{
    Log.CloseAndFlush();
}
