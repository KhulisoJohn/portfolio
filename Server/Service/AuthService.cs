using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using PortfolioApi.Data;
using PortfolioApi.DTOs;

namespace PortfolioApi.Services;

public interface IAuthService
{
    LoginResponseDto? Login(LoginRequestDto dto);
}

public class AuthService : IAuthService
{
    private readonly JwtSettings _jwtSettings;
    private readonly AdminUserSettings _adminUser;

    public AuthService(IOptions<JwtSettings> jwtSettings, IOptions<AdminUserSettings> adminUser)
    {
        _jwtSettings = jwtSettings.Value;
        _adminUser = adminUser.Value;
    }

    public LoginResponseDto? Login(LoginRequestDto dto)
    {
        if (dto.Username != _adminUser.Username)
            return null;

        var passwordValid = BCrypt.Net.BCrypt.Verify(dto.Password, _adminUser.PasswordHash);
        if (!passwordValid)
            return null;

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
}
