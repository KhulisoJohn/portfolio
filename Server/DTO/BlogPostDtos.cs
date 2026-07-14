using System.ComponentModel.DataAnnotations;

namespace PortfolioApi.DTOs;

public class BlogPostCreateDto
{
    [Required, StringLength(200, MinimumLength = 3)]
    public string Title { get; set; } = string.Empty;

    [Required, StringLength(300)]
    public string Excerpt { get; set; } = string.Empty;

    [Required]
    public string Content { get; set; } = string.Empty;

    public string? CoverImageUrl { get; set; }

    public List<string> Tags { get; set; } = new();

    public bool IsPublished { get; set; } = true;
}

public class BlogPostUpdateDto : BlogPostCreateDto
{
}

public class BlogPostSummaryDto
{
    public string Id { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Excerpt { get; set; } = string.Empty;
    public string? CoverImageUrl { get; set; }
    public List<string> Tags { get; set; } = new();
    public DateTime CreatedAt { get; set; }
}

public class BlogPostDetailDto : BlogPostSummaryDto
{
    public string Content { get; set; } = string.Empty;
    public DateTime? UpdatedAt { get; set; }
}
