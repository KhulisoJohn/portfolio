using Microsoft.Extensions.Options;
using MongoDB.Driver;
using PortfolioApi.Models;

namespace Server.Data;

public class PortfolioDbContext
{
    private readonly IMongoDatabase _database;

    public PortfolioDbContext(IOptions<MongoSettings> settings)
    {
        var client = new MongoClient(settings.Value.ConnectionString);
        _database = client.GetDatabase(settings.Value.DatabaseName);
    }

    public IMongoCollection<BlogPost> BlogPosts => _database.GetCollection<BlogPost>("blogPosts");
    public IMongoCollection<ContactMessage> ContactMessages => _database.GetCollection<ContactMessage>("contactMessages");
}

internal interface IMongoDatabase
{
}