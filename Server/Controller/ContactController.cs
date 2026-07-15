using Microsoft.AspNetCore.Mvc;
using Server.DTOs;
using Server.Services;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContactController : ControllerBase
{
    private readonly IContactService _contactService;

    public ContactController(IContactService contactService)
    {
        _contactService = contactService;
    }

    // POST api/contact
    [HttpPost]
    public async Task<IActionResult> SubmitContact([FromBody] ContactRequestDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var emailSent = await _contactService.SubmitContactMessageAsync(dto);

        if (!emailSent)
        {
            // Message was still saved; let the frontend show a softer error.
            return StatusCode(502, new { message = "Message received but the email notification failed to send. We'll still see it." });
        }

        return Ok(new { message = "Message sent successfully. Thank you for reaching out!" });
    }
}
