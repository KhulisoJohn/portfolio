using MongoDB.Driver;
using PortfolioApi.Data;
using PortfolioApi.DTOs;
using PortfolioApi.Models;

namespace PortfolioApi.Services;

public interface IBlogService
{
    Task<List<BlogPostSummaryDto>> GetPublishedPostsAsync();
    Task<BlogPostDetailDto?> GetPostBySlugAsync(string slug);
    Task<BlogPostDetailDto> CreatePostAsync(BlogPostCreateDto dto);
    Task<BlogPostDetailDto?> UpdatePostAsync(string id, BlogPostUpdateDto dto);
    Task<bool> DeletePostAsync(string id);
}

public class BlogService : IBlogService
{
    private readonly MongoDbContext _db;

    public BlogService(MongoDbContext db)
    {
        _db = db;
    }

    public async Task<List<BlogPostSummaryDto>> GetPublishedPostsAsync()
    {
        var posts = await _db.BlogPosts
            .Find(p => p.IsPublished)
            .SortByDescending(p => p.CreatedAt)
            .ToListAsync();

        return posts.Select(ToSummaryDto).ToList();
    }

    public async Task<BlogPostDetailDto?> GetPostBySlugAsync(string slug)
    {
        var post = await _db.BlogPosts.Find(p => p.Slug == slug && p.IsPublished).FirstOrDefaultAsync();
        return post is null ? null : ToDetailDto(post);
    }

    public async Task<BlogPostDetailDto> CreatePostAsync(BlogPostCreateDto dto)
    {
        var slug = await GenerateUniqueSlugAsync(dto.Title);

        var post = new BlogPost
        {
            Title = dto.Title,
            Slug = slug,
            Excerpt = dto.Excerpt,
            Content = dto.Content,
            CoverImageUrl = dto.CoverImageUrl,
            Tags = dto.Tags,
            IsPublished = dto.IsPublished,
            CreatedAt = DateTime.UtcNow
        };

        await _db.BlogPosts.InsertOneAsync(post);
        return ToDetailDto(post);
    }

    public async Task<BlogPostDetailDto?> UpdatePostAsync(string id, BlogPostUpdateDto dto)
    {
        var update = Builders<BlogPost>.Update
            .Set(p => p.Title, dto.Title)
            .Set(p => p.Excerpt, dto.Excerpt)
            .Set(p => p.Content, dto.Content)
            .Set(p => p.CoverImageUrl, dto.CoverImageUrl)
            .Set(p => p.Tags, dto.Tags)
            .Set(p => p.IsPublished, dto.IsPublished)
            .Set(p => p.UpdatedAt, DateTime.UtcNow);

        var options = new FindOneAndUpdateOptions<BlogPost> { ReturnDocument = ReturnDocument.After };
        var updated = await _db.BlogPosts.FindOneAndUpdateAsync<BlogPost>(p => p.Id == id, update, options);

        return updated is null ? null : ToDetailDto(updated);
    }

    public async Task<bool> DeletePostAsync(string id)
    {
        var result = await _db.BlogPosts.DeleteOneAsync(p => p.Id == id);
        return result.DeletedCount > 0;
    }

    private async Task<string> GenerateUniqueSlugAsync(string title)
    {
        var baseSlug = Slugify(title);
        var slug = baseSlug;
        var counter = 1;

        while (await _db.BlogPosts.Find(p => p.Slug == slug).AnyAsync())
        {
            slug = $"{baseSlug}-{counter}";
            counter++;
        }

        return slug;
    }

    private static string Slugify(string title)
    {
        var lower = title.ToLowerInvariant().Trim();
        var sb = new System.Text.StringBuilder();
        var lastWasDash = false;

        foreach (var c in lower)
        {
            if (char.IsLetterOrDigit(c))
            {
                sb.Append(c);
                lastWasDash = false;
            }
            else if (!lastWasDash)
            {
                sb.Append('-');
                lastWasDash = true;
            }
        }

        return sb.ToString().Trim('-');
    }

    private static BlogPostSummaryDto ToSummaryDto(BlogPost p) => new()
    {
        Id = p.Id!,
        Title = p.Title,
        Slug = p.Slug,
        Excerpt = p.Excerpt,
        CoverImageUrl = p.CoverImageUrl,
        Tags = p.Tags,
        CreatedAt = p.CreatedAt
    };

    private static BlogPostDetailDto ToDetailDto(BlogPost p) => new()
    {
        Id = p.Id!,
        Title = p.Title,
        Slug = p.Slug,
        Excerpt = p.Excerpt,
        Content = p.Content,
        CoverImageUrl = p.CoverImageUrl,
        Tags = p.Tags,
        CreatedAt = p.CreatedAt,
        UpdatedAt = p.UpdatedAt
    };
}
