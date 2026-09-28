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

        // Fail fast at startup if the configured hash isn't usable, instead of
        // crashing later on the first login attempt (IndexOutOfRangeException
        // from BCrypt.Verify on a malformed/quoted/empty hash).
        if (!IsWellFormedBCryptHash(_adminUser.PasswordHash))
        {
            _logger.LogWarning(
                "ADMIN_PASSWORD_HASH is missing or not a well-formed BCrypt hash " +
                "(expected 60 chars, starting with $2a$/$2b$/$2y$). " +
                "Login will be rejected until this is fixed. Check for stray quotes " +
                "or whitespace in the .env file / environment variable.");
        }
    }

    public LoginResponseDto? Login(LoginRequestDto dto)
    {
        if (dto.Username != _adminUser.Username)
        {
            _logger.LogWarning("Login failed: unknown username {Username}", dto.Username);
            return null;
        }

        if (!IsWellFormedBCryptHash(_adminUser.PasswordHash))
        {
            _logger.LogError(
                "Login rejected: configured admin password hash is malformed. " +
                "Refusing to call BCrypt.Verify to avoid a crash.");
            return null;
        }

        bool passwordValid;
        try
        {
            passwordValid = BCrypt.Net.BCrypt.Verify(dto.Password, _adminUser.PasswordHash);
        }
        catch (Exception ex)
        {
            // Defensive: never let a malformed hash or bad input crash the request
            // pipeline. Treat it as a failed login and log it for investigation.
            _logger.LogError(ex, "BCrypt.Verify threw unexpectedly during login for {Username}", dto.Username);
            return null;
        }

        if (!passwordValid)
        {
            _logger.LogWarning("Login failed: bad password for {Username}", dto.Username);
            return null;
        }

        _logger.LogInformation("Login succeeded for {Username}", dto.Username);

        var expiresAt = DateTime.UtcNow.AddMinutes(_jwtSettings.ExpiryMinutes);

        var claims = new[]
        {
            new Claim(ClaimTypes.Name, dto.Username),
            new Claim(ClaimTypes.Role, "Admin")
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Secret));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _jwtSettings.Issuer,
            audience: _jwtSettings.Audience,
            claims: claims,
            expires: expiresAt,
            signingCredentials: creds
        );

        return new LoginResponseDto
        {
            Token = new JwtSecurityTokenHandler().WriteToken(token),
            ExpiresAt = expiresAt
        };
    }

    /// <summary>
    /// Cheap sanity check that a string looks like a real BCrypt hash before
    /// handing it to BCrypt.Verify. BCrypt hashes are always 60 characters and
    /// start with $2a$, $2b$, or $2y$. This catches the common failure modes:
    /// empty string (env var missing), quoted value from a .env file, or
    /// truncated value from a too-short DB column.
    /// </summary>
    private static bool IsWellFormedBCryptHash(string? hash)
    {
        if (string.IsNullOrWhiteSpace(hash))
            return false;

        if (hash.Length != 60)
            return false;

        return hash.StartsWith("$2a$", StringComparison.Ordinal)
            || hash.StartsWith("$2b$", StringComparison.Ordinal)
            || hash.StartsWith("$2y$", StringComparison.Ordinal);
    }
}
