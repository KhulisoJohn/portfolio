using DotNetEnv;
using Server.Data;
using Server.Extensions;
using Server.Services;

Env.Load();

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddEnvironmentVariables();


// MongoDB
builder.Services.Configure<MongoSettings>(options =>
{
    options.ConnectionString =
        Environment.GetEnvironmentVariable("MONGO_CONNECTION_STRING")
        ?? throw new Exception("MONGO_CONNECTION_STRING missing");

    options.DatabaseName =
        Environment.GetEnvironmentVariable("MONGO_DATABASE_NAME")
        ?? "PortfolioDb";
});


// Brevo
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


// JWT
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
            Environment.GetEnvironmentVariable("JWT_EXPIRY_MINUTES") ?? "120"
        );
});


// Admin
builder.Services.Configure<AdminUserSettings>(options =>
{
    options.Username =
        Environment.GetEnvironmentVariable("ADMIN_USERNAME") ?? "";

    options.PasswordHash =
        Environment.GetEnvironmentVariable("ADMIN_PASSWORD_HASH") ?? "";
});


// Dependency Injection
builder.Services.AddSingleton<PortfolioDbContext>();

builder.Services.AddHttpClient<IEmailService, BrevoEmailService>();

builder.Services.AddScoped<IContactService, ContactService>();
builder.Services.AddScoped<IBlogService, BlogService>();
builder.Services.AddScoped<IAuthService, AuthService>();


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// CORS
var allowedOrigins = builder.Configuration
    .GetSection("CorsSettings:AllowedOrigins")
    .Get<string[]>() ?? Array.Empty<string>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("PortfolioFrontend", policy =>
    {
        policy.WithOrigins(allowedOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});


// JWT
builder.Services.AddJwtAuthentication(builder.Configuration);


var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


// Disable this while testing HTTP locally
// app.UseHttpsRedirection();


app.UseCors("PortfolioFrontend");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();