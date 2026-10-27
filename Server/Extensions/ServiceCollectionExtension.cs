
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Server.Data;

namespace Server.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddJwtAuthentication(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services
            .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer();

        services.AddOptions<JwtBearerOptions>(
            JwtBearerDefaults.AuthenticationScheme)
            .Configure<IOptions<JwtSettings>>((options, settingsOptions) =>
            {
                var jwtSettings = settingsOptions.Value;

                if (string.IsNullOrWhiteSpace(jwtSettings.Secret))
                    throw new InvalidOperationException(
                        "JWT_SECRET is missing.");

                if (string.IsNullOrWhiteSpace(jwtSettings.Issuer))
                    throw new InvalidOperationException(
                        "JWT_ISSUER is missing.");

                if (string.IsNullOrWhiteSpace(jwtSettings.Audience))
                    throw new InvalidOperationException(
                        "JWT_AUDIENCE is missing.");

                options.TokenValidationParameters =
                    new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,

                        ValidIssuer = jwtSettings.Issuer,
                        ValidAudience = jwtSettings.Audience,

                        IssuerSigningKey = new SymmetricSecurityKey(
                            Encoding.UTF8.GetBytes(jwtSettings.Secret)),

                        ClockSkew = TimeSpan.FromSeconds(30)
                    };
            });

        services.AddAuthorization();

        return services;
    }
}
