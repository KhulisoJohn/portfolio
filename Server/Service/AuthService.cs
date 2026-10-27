
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Server.Data;
using Server.DTOs;

namespace Server.Services;

public interface IAuthService
{
    LoginResponseDto? Login(LoginRequestDto dto);
}

public class AuthService : IAuthService
{
    private readonly JwtSettings _jwtSettings;
    private readonly AdminUserSettings _adminUser;
    private readonly ILogger<AuthService> _logger;

    public AuthService(
        IOptions<JwtSettings> jwtSettings,
        IOptions<AdminUserSettings> adminUser,
        ILogger<AuthService> logger)
    {
        _jwtSettings = jwtSettings.Value;
        _adminUser = adminUser.Value;
        _logger = logger;

        if (!IsWellFormedBCryptHash(_adminUser.PasswordHash))
        {
            _logger.LogWarning(
                "ADMIN_PASSWORD_HASH is missing or malformed. " +
                "Administrator login will fail until it is corrected.");
        }

        if (string.IsNullOrWhiteSpace(_jwtSettings.Secret) ||
            Encoding.UTF8.GetByteCount(_jwtSettings.Secret) < 32)
        {
            throw new InvalidOperationException(
                "JWT secret must contain at least 32 bytes.");
        }

        if (string.IsNullOrWhiteSpace(_jwtSettings.Issuer))
        {
            throw new InvalidOperationException(
                "JWT issuer must be configured.");
        }

        if (string.IsNullOrWhiteSpace(_jwtSettings.Audience))
        {
            throw new InvalidOperationException(
                "JWT audience must be configured.");
        }

        if (_jwtSettings.ExpiryMinutes <= 0)
        {
            throw new InvalidOperationException(
                "JWT expiry minutes must be greater than zero.");
        }

        if (string.IsNullOrWhiteSpace(_adminUser.Username))
        {
            throw new InvalidOperationException(
                "Administrator username must be configured.");
        }
    }

    public LoginResponseDto? Login(LoginRequestDto dto)
    {
        if (dto is null ||
            string.IsNullOrWhiteSpace(dto.Username) ||
            string.IsNullOrEmpty(dto.Password))
        {
            return null;
        }

        if (!string.Equals(
                dto.Username,
                _adminUser.Username,
                StringComparison.Ordinal))
        {
            _logger.LogWarning("Login failed: invalid credentials.");
            return null;
        }

        if (!IsWellFormedBCryptHash(_adminUser.PasswordHash))
        {
            _logger.LogError(
                "Login rejected because the configured password hash is invalid.");

            return null;
        }

        bool passwordValid;

        try
        {
            passwordValid = BCrypt.Net.BCrypt.Verify(
                dto.Password,
                _adminUser.PasswordHash);
        }
        catch (Exception ex)
        {
            _logger.LogError(
                ex,
                "Password verification failed unexpectedly.");

            return null;
        }

        if (!passwordValid)
        {
            _logger.LogWarning("Login failed: invalid credentials.");
            return null;
        }

        var now = DateTime.UtcNow;
        var expiresAt = now.AddMinutes(_jwtSettings.ExpiryMinutes);

        var claims = new[]
        {
            // Stable identifier for the configured administrator.
            // Replace with a database user ID if multi-user support is added.
            new Claim(
                ClaimTypes.NameIdentifier,
                _adminUser.Username),

            new Claim(
                ClaimTypes.Name,
                _adminUser.Username),

            new Claim(
                ClaimTypes.Role,
                "Admin"),

            new Claim(
                JwtRegisteredClaimNames.Jti,
                Guid.NewGuid().ToString())
        };

        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_jwtSettings.Secret));

        var credentials = new SigningCredentials(
            key,
            SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _jwtSettings.Issuer,
            audience: _jwtSettings.Audience,
            claims: claims,
            notBefore: now,
            expires: expiresAt,
            signingCredentials: credentials);

        _logger.LogInformation(
            "Administrator login succeeded.");

        return new LoginResponseDto
        {
            Token = new JwtSecurityTokenHandler().WriteToken(token),
            TokenType = "Bearer",
            ExpiresAt = expiresAt
        };
    }

    private static bool IsWellFormedBCryptHash(string? hash)
    {
        if (string.IsNullOrWhiteSpace(hash) || hash.Length != 60)
        {
            return false;
        }

        return hash.StartsWith("$2a$", StringComparison.Ordinal)
            || hash.StartsWith("$2b$", StringComparison.Ordinal)
            || hash.StartsWith("$2y$", StringComparison.Ordinal);
    }
}
