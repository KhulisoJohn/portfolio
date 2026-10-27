
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.DTOs;
using Server.Services;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BlogController : ControllerBase
{
    private readonly IBlogService _blogService;

    public BlogController(IBlogService blogService)
    {
        _blogService = blogService;
    }

    // ==========================================
    // PUBLIC ENDPOINTS — No login required
    // ==========================================

    // GET: api/blog
    // Readers only receive published posts.
    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<List<BlogPostSummaryDto>>> GetAll()
    {
        var posts = await _blogService.GetPublishedPostsAsync();
        return Ok(posts);
    }

    // GET: api/blog/my-first-blog-post
    // Readers can retrieve a published post by its slug.
    [AllowAnonymous]
    [HttpGet("{slug}")]
    public async Task<ActionResult<BlogPostDetailDto>> GetBySlug(
        string slug)
    {
        var post = await _blogService.GetPostBySlugAsync(slug);

        if (post is null)
        {
            return NotFound(new
            {
                message = "Post not found."
            });
        }

        return Ok(post);
    }

    // ==========================================
    // ADMIN ENDPOINTS — Admin JWT required
    // ==========================================

    // GET: api/blog/admin
    // Returns all posts, including unpublished drafts.
    [Authorize(Roles = "Admin")]
    [HttpGet("admin")]
    public async Task<ActionResult<List<BlogPostSummaryDto>>>
        GetAllForAdmin()
    {
        var posts = await _blogService.GetAllPostsForAdminAsync();
        return Ok(posts);
    }

    // POST: api/blog
    // Creates a draft for the authenticated administrator.
    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<BlogPostDetailDto>> Create(
        [FromBody] BlogPostCreateDto dto)
    {
        // [ApiController] automatically handles invalid model state.
        var authorId = User.FindFirstValue(
            ClaimTypes.NameIdentifier);

        var authorName = User.Identity?.Name;

        if (string.IsNullOrWhiteSpace(authorId) ||
            string.IsNullOrWhiteSpace(authorName))
        {
            return Forbid();
        }

        var created = await _blogService.CreatePostAsync(
            dto,
            authorId,
            authorName);

        // New posts are drafts, so the public slug endpoint will
        // not return them until they have been published.
        return StatusCode(
            StatusCodes.Status201Created,
            created);
    }

    // PUT: api/blog/{id}
    // Updates a post. Publishing is handled separately.
    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<ActionResult<BlogPostDetailDto>> Update(
        string id,
        [FromBody] BlogPostUpdateDto dto)
    {
        var updated = await _blogService.UpdatePostAsync(id, dto);

        if (updated is null)
        {
            return NotFound(new
            {
                message = "Post not found."
            });
        }

        return Ok(updated);
    }

    // POST: api/blog/{id}/publish
    // Makes a draft publicly accessible.
    [Authorize(Roles = "Admin")]
    [HttpPost("{id}/publish")]
    public async Task<ActionResult<BlogPostDetailDto>> Publish(
        string id)
    {
        var published = await _blogService.PublishPostAsync(id);

        if (published is null)
        {
            return NotFound(new
            {
                message = "Post not found."
            });
        }

        return Ok(published);
    }

    // POST: api/blog/{id}/unpublish
    // Removes a published post from public access.
    [Authorize(Roles = "Admin")]
    [HttpPost("{id}/unpublish")]
    public async Task<ActionResult<BlogPostDetailDto>> Unpublish(
        string id)
    {
        var unpublished = await _blogService.UnpublishPostAsync(id);

        if (unpublished is null)
        {
            return NotFound(new
            {
                message = "Post not found."
            });
        }

        return Ok(unpublished);
    }

    // DELETE: api/blog/{id}
    // Permanently deletes a post.
    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var deleted = await _blogService.DeletePostAsync(id);

        if (!deleted)
        {
            return NotFound(new
            {
                message = "Post not found."
            });
        }

        return NoContent();
    }
}
