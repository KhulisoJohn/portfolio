
using System.ComponentModel.DataAnnotations;

namespace Server.DTOs;

public class BlogPostCreateDto
{
    [Required]
    [StringLength(200, MinimumLength = 3)]
    public string Title { get; set; } = string.Empty;

    [Required]
    [StringLength(300, MinimumLength = 10)]
    public string Excerpt { get; set; } = string.Empty;

    [Required]
    [MinLength(1)]
    public string Content { get; set; } = string.Empty;

    [Url]
    [StringLength(2048)]
    public string? CoverImageUrl { get; set; }

    [MaxLength(10)]
    public List<string> Tags { get; set; } = new();

    // New blog posts are drafts by default.
    public bool IsPublished { get; set; } = false;
}

public class BlogPostUpdateDto
{
    [Required]
    [StringLength(200, MinimumLength = 3)]
    public string Title { get; set; } = string.Empty;

    [Required]
    [StringLength(300, MinimumLength = 10)]
    public string Excerpt { get; set; } = string.Empty;

    [Required]
    [MinLength(1)]
    public string Content { get; set; } = string.Empty;

    [Url]
    [StringLength(2048)]
    public string? CoverImageUrl { get; set; }

    [MaxLength(10)]
    public List<string> Tags { get; set; } = new();
}

public class BlogPostSummaryDto
{
    public string Id { get; set; } = string.Empty;

    public string Title { get; set; } = string.Empty;

    public string Slug { get; set; } = string.Empty;

    public string Excerpt { get; set; } = string.Empty;

    public string? CoverImageUrl { get; set; }

    public List<string> Tags { get; set; } = new();

    public string? AuthorName { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? PublishedAt { get; set; }
}

public class BlogPostDetailDto : BlogPostSummaryDto
{
    public string Content { get; set; } = string.Empty;

    public DateTime? UpdatedAt { get; set; }
}
