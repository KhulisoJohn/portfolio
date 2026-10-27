
using MongoDB.Driver;
using Server.Data;
using Server.DTOs;
using Server.Models;
using System.Text;

namespace Server.Services;

public interface IBlogService
{
    // Public operations
    Task<List<BlogPostSummaryDto>> GetPublishedPostsAsync();
    Task<BlogPostDetailDto?> GetPostBySlugAsync(string slug);

    // Author operations
    Task<List<BlogPostSummaryDto>> GetAllPostsForAdminAsync();

    Task<BlogPostDetailDto> CreatePostAsync(
        BlogPostCreateDto dto,
        string authorId,
        string authorName);

    Task<BlogPostDetailDto?> UpdatePostAsync(
        string id,
        BlogPostUpdateDto dto);

    Task<BlogPostDetailDto?> PublishPostAsync(string id);
    Task<BlogPostDetailDto?> UnpublishPostAsync(string id);

    Task<bool> DeletePostAsync(string id);
}

public class BlogService : IBlogService
{
    private readonly PortfolioDbContext _db;

    public BlogService(PortfolioDbContext db)
    {
        _db = db;
    }

    // ---------------------------------------------------------
    // PUBLIC OPERATIONS
    // ---------------------------------------------------------

    public async Task<List<BlogPostSummaryDto>> GetPublishedPostsAsync()
    {
        var posts = await _db.BlogPosts
            .Find(p => p.IsPublished)
            .SortByDescending(p => p.PublishedAt)
            .ThenByDescending(p => p.CreatedAt)
            .ToListAsync();

        return posts.Select(ToSummaryDto).ToList();
    }

    public async Task<BlogPostDetailDto?> GetPostBySlugAsync(string slug)
    {
        if (string.IsNullOrWhiteSpace(slug))
            return null;

        var normalizedSlug = slug.Trim().ToLowerInvariant();

        var post = await _db.BlogPosts
            .Find(p => p.Slug == normalizedSlug && p.IsPublished)
            .FirstOrDefaultAsync();

        return post is null ? null : ToDetailDto(post);
    }

    // ---------------------------------------------------------
    // AUTHOR OPERATIONS
    // ---------------------------------------------------------

    public async Task<List<BlogPostSummaryDto>> GetAllPostsForAdminAsync()
    {
        var posts = await _db.BlogPosts
            .Find(_ => true)
            .SortByDescending(p => p.UpdatedAt)
            .ThenByDescending(p => p.CreatedAt)
            .ToListAsync();

        return posts.Select(ToSummaryDto).ToList();
    }

    public async Task<BlogPostDetailDto> CreatePostAsync(
        BlogPostCreateDto dto,
        string authorId,
        string authorName)
    {
        ArgumentNullException.ThrowIfNull(dto);

        if (string.IsNullOrWhiteSpace(authorId))
            throw new ArgumentException(
                "An authenticated author ID is required.",
                nameof(authorId));

        if (string.IsNullOrWhiteSpace(authorName))
            throw new ArgumentException(
                "An author name is required.",
                nameof(authorName));

        var now = DateTime.UtcNow;
        var slug = await GenerateUniqueSlugAsync(dto.Title);

        var post = new BlogPost
        {
            Title = dto.Title.Trim(),
            Slug = slug,
            Excerpt = dto.Excerpt.Trim(),
            Content = dto.Content,
            CoverImageUrl = dto.CoverImageUrl,
            Tags = NormalizeTags(dto.Tags),

            AuthorId = authorId,
            AuthorName = authorName.Trim(),

            // Always create drafts. Publishing is a separate operation.
            IsPublished = false,
            PublishedAt = null,

            CreatedAt = now,
            UpdatedAt = null
        };

        await _db.BlogPosts.InsertOneAsync(post);

        return ToDetailDto(post);
    }

    public async Task<BlogPostDetailDto?> UpdatePostAsync(
        string id,
        BlogPostUpdateDto dto)
    {
        ArgumentNullException.ThrowIfNull(dto);

        if (!MongoDB.Bson.ObjectId.TryParse(id, out _))
            return null;

        var existing = await _db.BlogPosts
            .Find(p => p.Id == id)
            .FirstOrDefaultAsync();

        if (existing is null)
            return null;

        var update = Builders<BlogPost>.Update
            .Set(p => p.Title, dto.Title.Trim())
            .Set(p => p.Excerpt, dto.Excerpt.Trim())
            .Set(p => p.Content, dto.Content)
            .Set(p => p.CoverImageUrl, dto.CoverImageUrl)
            .Set(p => p.Tags, NormalizeTags(dto.Tags))
            .Set(p => p.UpdatedAt, DateTime.UtcNow);

        // Generate a new slug if the title changes.
        if (!string.Equals(
                existing.Title,
                dto.Title.Trim(),
                StringComparison.Ordinal))
        {
            var newSlug = await GenerateUniqueSlugAsync(
                dto.Title,
                existing.Id);

            update = update.Set(p => p.Slug, newSlug);
        }

        var options = new FindOneAndUpdateOptions<BlogPost>
        {
            ReturnDocument = ReturnDocument.After
        };

        var updated = await _db.BlogPosts.FindOneAndUpdateAsync(
            p => p.Id == id,
            update,
            options);

        return updated is null ? null : ToDetailDto(updated);
    }

    public async Task<BlogPostDetailDto?> PublishPostAsync(string id)
    {
        if (!MongoDB.Bson.ObjectId.TryParse(id, out _))
            return null;

        var now = DateTime.UtcNow;

        var update = Builders<BlogPost>.Update
            .Set(p => p.IsPublished, true)
            .Set(p => p.PublishedAt, now)
            .Set(p => p.UpdatedAt, now);

        var options = new FindOneAndUpdateOptions<BlogPost>
        {
            ReturnDocument = ReturnDocument.After
        };

        var published = await _db.BlogPosts.FindOneAndUpdateAsync(
            p => p.Id == id,
            update,
            options);

        return published is null ? null : ToDetailDto(published);
    }

    public async Task<BlogPostDetailDto?> UnpublishPostAsync(string id)
    {
        if (!MongoDB.Bson.ObjectId.TryParse(id, out _))
            return null;

        var now = DateTime.UtcNow;

        var update = Builders<BlogPost>.Update
            .Set(p => p.IsPublished, false)
            .Set(p => p.PublishedAt, (DateTime?)null)
            .Set(p => p.UpdatedAt, now);

        var options = new FindOneAndUpdateOptions<BlogPost>
        {
            ReturnDocument = ReturnDocument.After
        };

        var unpublished = await _db.BlogPosts.FindOneAndUpdateAsync(
            p => p.Id == id,
            update,
            options);

        return unpublished is null ? null : ToDetailDto(unpublished);
    }

    public async Task<bool> DeletePostAsync(string id)
    {
        if (!MongoDB.Bson.ObjectId.TryParse(id, out _))
            return false;

        var result = await _db.BlogPosts.DeleteOneAsync(
            p => p.Id == id);

        return result.DeletedCount > 0;
    }

    // ---------------------------------------------------------
    // SLUG GENERATION
    // ---------------------------------------------------------

    private async Task<string> GenerateUniqueSlugAsync(
        string title,
        string? excludeId = null)
    {
        var baseSlug = Slugify(title);

        if (string.IsNullOrWhiteSpace(baseSlug))
        {
            throw new ArgumentException(
                "The title must contain letters or numbers.",
                nameof(title));
        }

        var slug = baseSlug;
        var counter = 1;

        while (true)
        {
            var exists = await _db.BlogPosts
                .Find(p =>
                    p.Slug == slug &&
                    (excludeId == null || p.Id != excludeId))
                .AnyAsync();

            if (!exists)
                return slug;

            slug = $"{baseSlug}-{counter}";
            counter++;
        }
    }

    private static string Slugify(string title)
    {
        if (string.IsNullOrWhiteSpace(title))
            return string.Empty;

        var lower = title.Trim().ToLowerInvariant();
        var builder = new StringBuilder();
        var lastWasDash = false;

        foreach (var c in lower)
        {
            if (char.IsLetterOrDigit(c))
            {
                builder.Append(c);
                lastWasDash = false;
            }
            else if (!lastWasDash && builder.Length > 0)
            {
                builder.Append('-');
                lastWasDash = true;
            }
        }

        return builder.ToString().Trim('-');
    }

    // ---------------------------------------------------------
    // DATA NORMALIZATION
    // ---------------------------------------------------------

    private static List<string> NormalizeTags(List<string>? tags)
    {
        if (tags is null)
            return new List<string>();

        return tags
            .Where(tag => !string.IsNullOrWhiteSpace(tag))
            .Select(tag => tag.Trim())
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToList();
    }

    // ---------------------------------------------------------
    // DTO MAPPING
    // ---------------------------------------------------------

    private static BlogPostSummaryDto ToSummaryDto(BlogPost post)
    {
        return new BlogPostSummaryDto
        {
            Id = post.Id ?? string.Empty,
            Title = post.Title,
            Slug = post.Slug,
            Excerpt = post.Excerpt,
            CoverImageUrl = post.CoverImageUrl,
            Tags = post.Tags ?? new List<string>(),
            AuthorName = post.AuthorName,
            CreatedAt = post.CreatedAt,
            PublishedAt = post.PublishedAt
        };
    }

    private static BlogPostDetailDto ToDetailDto(BlogPost post)
    {
        return new BlogPostDetailDto
        {
            Id = post.Id ?? string.Empty,
            Title = post.Title,
            Slug = post.Slug,
            Excerpt = post.Excerpt,
            Content = post.Content,
            CoverImageUrl = post.CoverImageUrl,
            Tags = post.Tags ?? new List<string>(),
            AuthorName = post.AuthorName,
            CreatedAt = post.CreatedAt,
            PublishedAt = post.PublishedAt,
            UpdatedAt = post.UpdatedAt
        };
    }
}
