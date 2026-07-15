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

    // GET api/blog
    [HttpGet]
    public async Task<ActionResult<List<BlogPostSummaryDto>>> GetAll()
    {
        var posts = await _blogService.GetPublishedPostsAsync();
        return Ok(posts);
    }

    // GET api/blog/{slug}
    [HttpGet("{slug}")]
    public async Task<ActionResult<BlogPostDetailDto>> GetBySlug(string slug)
    {
        var post = await _blogService.GetPostBySlugAsync(slug);
        if (post is null)
            return NotFound(new { message = "Post not found" });

        return Ok(post);
    }

    // POST api/blog  (admin only)
    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<BlogPostDetailDto>> Create([FromBody] BlogPostCreateDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var created = await _blogService.CreatePostAsync(dto);
        return CreatedAtAction(nameof(GetBySlug), new { slug = created.Slug }, created);
    }

    // PUT api/blog/{id}  (admin only)
    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<ActionResult<BlogPostDetailDto>> Update(string id, [FromBody] BlogPostUpdateDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var updated = await _blogService.UpdatePostAsync(id, dto);
        if (updated is null)
            return NotFound(new { message = "Post not found" });

        return Ok(updated);
    }

    // DELETE api/blog/{id}  (admin only)
    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var deleted = await _blogService.DeletePostAsync(id);
        if (!deleted)
            return NotFound(new { message = "Post not found" });

        return NoContent();
    }
}