using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Options;
using Server.Data;

namespace Server.Services;

public interface IEmailService
{
    Task<bool> SendContactNotificationAsync(string senderName, string senderEmail, string message);
}

public class BrevoEmailService : IEmailService
{
    private readonly HttpClient _httpClient;
    private readonly BrevoSettings _settings;
    private readonly ILogger<BrevoEmailService> _logger;
    private const string BrevoApiUrl = "https://api.brevo.com/v3/smtp/email";

    public BrevoEmailService(HttpClient httpClient, IOptions<BrevoSettings> settings, ILogger<BrevoEmailService> logger)
    {
        _httpClient = httpClient;
        _settings = settings.Value;
        _logger = logger;
    }

    public async Task<bool> SendContactNotificationAsync(string senderName, string senderEmail, string message)
    {
        var payload = new
        {
            sender = new { name = _settings.SenderName, email = _settings.SenderEmail },
            to = new[] { new { email = _settings.RecipientEmail, name = _settings.SenderName } },
            replyTo = new { email = senderEmail, name = senderName },
            subject = $"New portfolio contact message from {senderName}",
            htmlContent = $@"
                <h2>New message from your portfolio site</h2>
                <p><strong>Name:</strong> {System.Net.WebUtility.HtmlEncode(senderName)}</p>
                <p><strong>Email:</strong> {System.Net.WebUtility.HtmlEncode(senderEmail)}</p>
                <p><strong>Message:</strong></p>
                <p>{System.Net.WebUtility.HtmlEncode(message).Replace("\n", "<br/>")}</p>"
        };

        var request = new HttpRequestMessage(HttpMethod.Post, BrevoApiUrl)
        {
            Content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json")
        };
        request.Headers.Add("api-key", _settings.ApiKey);
        request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

        try
        {
            var response = await _httpClient.SendAsync(request);
            if (!response.IsSuccessStatusCode)
            {
                var body = await response.Content.ReadAsStringAsync();
                _logger.LogError("Brevo email send failed: {Status} {Body}", response.StatusCode, body);
                return false;
            }
            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Exception while sending email via Brevo");
            return false;
        }
    }
}
