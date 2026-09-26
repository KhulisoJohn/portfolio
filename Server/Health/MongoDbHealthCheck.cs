using Microsoft.Extensions.Diagnostics.HealthChecks;
using MongoDB.Bson;
using Server.Data;

namespace Server.Health;

public class MongoDbHealthCheck : IHealthCheck
{
    private readonly PortfolioDbContext _dbContext;

    public MongoDbHealthCheck(PortfolioDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<HealthCheckResult> CheckHealthAsync(
        HealthCheckContext context,
        CancellationToken cancellationToken = default)
    {
        try
        {
            await _dbContext.Database.RunCommandAsync<BsonDocument>(
                new BsonDocument("ping", 1),
                cancellationToken: cancellationToken);

            return HealthCheckResult.Healthy(
                "MongoDB is reachable.");
        }
        catch (Exception ex)
        {
            return HealthCheckResult.Unhealthy(
                "MongoDB is unreachable.",
                ex);
        }
    }
}
