using MongoDB.Driver;
using PortfolioApi.Data;
using PortfolioApi.DTOs;
using PortfolioApi.Models;

namespace PortfolioApi.Services;

public interface IContactService
{
    Task<bool> SubmitContactMessageAsync(ContactRequestDto dto);
}

public class ContactService : IContactService
{
    private readonly MongoDbContext _db;
    private readonly IEmailService _emailService;
    private readonly ILogger<ContactService> _logger;

    public ContactService(MongoDbContext db, IEmailService emailService, ILogger<ContactService> logger)
    {
        _db = db;
        _emailService = emailService;
        _logger = logger;
    }

    public async Task<bool> SubmitContactMessageAsync(ContactRequestDto dto)
    {
        var emailSent = await _emailService.SendContactNotificationAsync(dto.Name, dto.Email, dto.Message);

        var record = new ContactMessage
        {
            Name = dto.Name,
            Email = dto.Email,
            Message = dto.Message,
            EmailSent = emailSent,
            CreatedAt = DateTime.UtcNow
        };

        try
        {
            await _db.ContactMessages.InsertOneAsync(record);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to save contact message to MongoDB");
            // Don't fail the whole request just because the DB write failed,
            // as long as the email itself went out.
        }

        return emailSent;
    }
}
