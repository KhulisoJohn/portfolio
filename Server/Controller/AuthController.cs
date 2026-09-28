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

    public AuthController(IAuthService authService, ILogger<AuthController> logger)
    {
        _authService = authService;
        _logger = logger;
    }

    // POST api/auth/login
    [HttpPost("login")]
    [EnableRateLimiting(RateLimitingExtensions.LoginPolicy)]
    public IActionResult Login([FromBody] LoginRequestDto dto)
    {
        var result = _authService.Login(dto);
        if (result is null)
        {
            _logger.LogWarning("Rejected login attempt for {Username} from {Ip}",
                dto.Username, HttpContext.Connection.RemoteIpAddress);
            return Unauthorized(new { message = "Invalid username or password" });
        }

        return Ok(result);
    }
}
