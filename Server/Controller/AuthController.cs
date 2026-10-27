
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Server.DTOs;
using Server.Extensions;
using Server.Services;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly ILogger<AuthController> _logger;

    public AuthController(
        IAuthService authService,
        ILogger<AuthController> logger)
    {
        _authService = authService;
        _logger = logger;
    }

    // POST: api/auth/login
    // Public endpoint: users must be able to log in without an existing token.
    [AllowAnonymous]
    [HttpPost("login")]
    [EnableRateLimiting(RateLimitingExtensions.LoginPolicy)]
    public IActionResult Login([FromBody] LoginRequestDto dto)
    {
        if (dto is null ||
            string.IsNullOrWhiteSpace(dto.Username) ||
            string.IsNullOrEmpty(dto.Password))
        {
            return BadRequest(new
            {
                message = "Username and password are required."
            });
        }

        var result = _authService.Login(dto);

        if (result is null)
        {
            _logger.LogWarning(
                "Rejected login attempt for {Username} from {Ip}",
                dto.Username,
                HttpContext.Connection.RemoteIpAddress?.ToString());

            return Unauthorized(new
            {
                message = "Invalid username or password."
            });
        }

        return Ok(result);
    }
}
