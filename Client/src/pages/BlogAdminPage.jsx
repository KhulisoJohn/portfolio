
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  ImagePlus,
  LoaderCircle,
  Pencil,
  Plus,
  RefreshCw,
  Send,
  Trash2,
  Eye,
  EyeOff,
  X,
} from "lucide-react";

import {
  getAdminBlogPosts,
  createBlogPost,
  updateBlogPost,
  publishBlogPost,
  unpublishBlogPost,
  deleteBlogPost,
} from "../lib/api";
import { usePageTitle } from "../hooks/usePageTitle";

const emptyForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverImageUrl: "",
  tags: "",
  isPublished: false,
};

const getPostId = (post) => post.id ?? post._id;

const isPostPublished = (post) => post.isPublished === true;

const formatDate = (value) => {
  if (!value) return "Not available";

  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? "Not available"
    : date.toLocaleDateString("en-ZA", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
};

const getErrorMessage = (error) =>
  error instanceof Error ? error.message : "Something went wrong.";

export default function BlogAdminPage() {
  usePageTitle("Manage Blog | Admin");

  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ ...emptyForm });
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [busyPostId, setBusyPostId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (!coverImageFile) {
      setImagePreview("");
      return undefined;
    }

    const previewUrl = URL.createObjectURL(coverImageFile);
    setImagePreview(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [coverImageFile]);

  const loadPosts = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const result = await getAdminBlogPosts();
      const data = Array.isArray(result)
        ? result
        : result?.posts ?? result?.data ?? [];

      setPosts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    const nextValue = type === "checkbox" ? checked : value;

    setForm((current) => {
      const next = { ...current, [name]: nextValue };

      if (name === "title" && !editingId) {
        next.slug = value
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-");
      }

      return next;
    });
  };

  const resetForm = () => {
    setForm({ ...emptyForm });
    setEditingId(null);
    setCoverImageFile(null);
    setError("");
    setSuccess("");
  };

  const handleEdit = (post) => {
    setEditingId(getPostId(post));

    setForm({
      title: post.title ?? "",
      slug: post.slug ?? "",
      excerpt: post.excerpt ?? "",
      content: post.content ?? "",
      coverImageUrl: post.coverImageUrl ?? "",
      tags: Array.isArray(post.tags) ? post.tags.join(", ") : "",
      isPublished: isPostPublished(post),
    });

    setCoverImageFile(null);
    setError("");
    setSuccess("");

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setError("Choose a JPG, PNG, or WEBP image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("The image must be 5 MB or smaller.");
      return;
    }

    setError("");
    setCoverImageFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setError("");
    setSuccess("");

    try {
      let coverImageUrl = form.coverImageUrl.trim();

      // A selected local file needs a working backend upload endpoint.
      if (coverImageFile) {
        setError(
          "Image selected. Connect your image upload endpoint before saving this file."
        );
        return;
      }

      const payload = {
        title: form.title.trim(),
        slug: form.slug.trim(),
        excerpt: form.excerpt.trim(),
        content: form.content.trim(),
        coverImageUrl,
        tags: form.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        isPublished: form.isPublished,
      };

      if (editingId) {
        await updateBlogPost(editingId, payload);
      } else {
        await createBlogPost(payload);
      }

      const message = editingId
        ? "Blog post updated successfully."
        : "Blog post created successfully.";

      resetForm();
      setSuccess(message);
      await loadPosts();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublishToggle = async (post) => {
    const id = getPostId(post);
    const currentlyPublished = isPostPublished(post);

    setBusyPostId(id);
    setError("");
    setSuccess("");

    try {
      if (currentlyPublished) {
        await unpublishBlogPost(id);
        setSuccess("Post moved back to drafts.");
      } else {
        await publishBlogPost(id);
        setSuccess("Post published successfully.");
      }

      await loadPosts();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setBusyPostId(null);
    }
  };

  const handleDelete = async (post) => {
    const id = getPostId(post);

    if (
      !window.confirm(
        `Delete "${post.title}" permanently? This cannot be undone.`
      )
    ) {
      return;
    }

    setBusyPostId(id);
    setError("");
    setSuccess("");

    try {
      await deleteBlogPost(id);

      setPosts((current) =>
        current.filter((item) => getPostId(item) !== id)
      );

      if (editingId === id) {
        resetForm();
      }

      setSuccess("Blog post deleted.");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setBusyPostId(null);
    }
  };

  const publishedCount = posts.filter(isPostPublished).length;
  const draftCount = posts.length - publishedCount;

  return (
    <main className="min-h-screen bg-background px-4 py-8 md:py-12">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-primary"
        >
          <ArrowLeft size={16} />
          Back to Blog
        </Link>

        <header className="mb-8">
          <p className="mb-2 text-sm uppercase tracking-widest text-primary">
            Portfolio administration
          </p>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Blog Management
          </h1>
          <p className="mt-2 text-muted-foreground">
            Create articles, manage drafts, and publish your work.
          </p>
        </header>

        {error && (
          <div
            role="alert"
            className="mb-5 flex items-start justify-between gap-3 rounded-xl border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive"
          >
            <span>{error}</span>
            <button
              type="button"
              onClick={() => setError("")}
              aria-label="Dismiss error"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {success && (
          <div
            role="status"
            className="mb-5 flex items-start justify-between gap-3 rounded-xl border border-green-600/30 bg-green-50 p-4 text-sm text-green-800"
          >
            <span>{success}</span>
            <button
              type="button"
              onClick={() => setSuccess("")}
              aria-label="Dismiss success message"
            >
              <X size={18} />
            </button>
          </div>
        )}

        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            {
              label: "Total posts",
              count: posts.length,
              icon: FileText,
            },
            {
              label: "Published",
              count: publishedCount,
              icon: Eye,
            },
            {
              label: "Drafts",
              count: draftCount,
              icon: EyeOff,
            },
          ].map(({ label, count, icon: Icon }) => (
            <div
              key={label}
              className="rounded-2xl border bg-card p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{label}</p>
                <Icon size={19} className="text-primary" />
              </div>
              <p className="mt-3 text-3xl font-bold tabular-nums">
                {count}
              </p>
            </div>
          ))}
        </section>

        <section className="mb-10 rounded-2xl border bg-card p-5 md:p-7">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold">
                {editingId ? "Edit blog post" : "Create a blog post"}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Write your article and choose whether to publish it.
              </p>
            </div>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border px-3 py-2 text-sm hover:bg-secondary"
              >
                Cancel editing
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-medium">
                  Title *
                </span>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  maxLength={200}
                  className="w-full rounded-lg border bg-background p-3"
                  placeholder="My latest project..."
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium">
                  URL slug *
                </span>
                <input
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  required
                  maxLength={200}
                  pattern="[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*"
                  title="Use letters, numbers, and hyphens."
                  className="w-full rounded-lg border bg-background p-3"
                  placeholder="my-latest-project"
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-medium">
                Excerpt *
              </span>
              <textarea
                name="excerpt"
                value={form.excerpt}
                onChange={handleChange}
                required
                rows={3}
                maxLength={500}
                className="w-full rounded-lg border bg-background p-3"
                placeholder="A short summary of your article..."
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium">
                Article content *
              </span>
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                required
                rows={12}
                className="w-full rounded-lg border bg-background p-3 font-mono text-sm"
                placeholder="Write your full article here..."
              />
              <span className="mt-1 block text-xs text-muted-foreground">
                Plain text and Markdown are supported by the article renderer.
              </span>
            </label>

            <div>
              <label
                htmlFor="coverImage"
                className="mb-2 block text-sm font-medium"
              >
                Cover image
              </label>

              <label
                htmlFor="coverImage"
                className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center transition hover:bg-secondary/40"
              >
                <ImagePlus size={28} className="mb-3 text-primary" />
                <span className="font-medium">
                  Choose an image from your device
                </span>
                <span className="mt-1 text-xs text-muted-foreground">
                  JPG, PNG, or WEBP · Maximum 5 MB
                </span>
                <input
                  id="coverImage"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageChange}
                  className="sr-only"
                />
              </label>

              {(imagePreview || form.coverImageUrl) && (
                <div className="mt-4">
                  <img
                    src={imagePreview || form.coverImageUrl}
                    alt="Blog cover preview"
                    className="max-h-72 w-full rounded-xl border object-cover"
                  />
                  {coverImageFile && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      Selected: {coverImageFile.name}. An upload endpoint is
                      required to save this local image.
                    </p>
                  )}
                </div>
              )}

              {!coverImageFile && (
                <label className="mt-4 block">
                  <span className="mb-2 block text-xs text-muted-foreground">
                    Or use an existing image URL
                  </span>
                  <input
                    type="url"
                    name="coverImageUrl"
                    value={form.coverImageUrl}
                    onChange={handleChange}
                    className="w-full rounded-lg border bg-background p-3"
                    placeholder="https://example.com/image.jpg"
                  />
                </label>
              )}
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-medium">Tags</span>
              <input
                name="tags"
                value={form.tags}
                onChange={handleChange}
                className="w-full rounded-lg border bg-background p-3"
                placeholder="Hackathon, React, Backend"
              />
              <span className="mt-1 block text-xs text-muted-foreground">
                Separate tags with commas.
              </span>
            </label>

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border p-4">
              <input
                type="checkbox"
                name="isPublished"
                checked={form.isPublished}
                onChange={handleChange}
                className="mt-1 h-4 w-4 accent-primary"
              />
              <span>
                <span className="block font-medium">
                  Publish immediately after saving
                </span>
                <span className="mt-1 block text-sm text-muted-foreground">
                  {form.isPublished
                    ? "This article will be saved as published."
                    : "This article will be saved as a draft."}
                </span>
              </span>
            </label>

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={isSaving}
                className="cosmic-button inline-flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSaving ? (
                  <LoaderCircle size={17} className="animate-spin" />
                ) : editingId ? (
                  <Pencil size={17} />
                ) : (
                  <Plus size={17} />
                )}
                {isSaving
                  ? "Saving..."
                  : editingId
                    ? "Save changes"
                    : "Create post"}
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border px-5 py-2 transition hover:bg-secondary"
              >
                Clear form
              </button>
            </div>
          </form>
        </section>

        <section>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-semibold">All blog posts</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Manage publication status and existing articles.
              </p>
            </div>

            <button
              type="button"
              onClick={loadPosts}
              disabled={isLoading}
              className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition hover:bg-secondary disabled:opacity-50"
            >
              <RefreshCw
                size={15}
                className={isLoading ? "animate-spin" : ""}
              />
              Refresh
            </button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center gap-2 py-12 text-muted-foreground">
              <LoaderCircle size={20} className="animate-spin" />
              Loading blog posts...
            </div>
          ) : posts.length === 0 ? (
            <div className="rounded-2xl border p-10 text-center">
              <FileText
                size={32}
                className="mx-auto mb-3 text-muted-foreground"
              />
              <h3 className="font-semibold">No blog posts yet</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Create your first article using the form above.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => {
                const id = getPostId(post);
                const isBusy = busyPostId === id;
                const published = isPostPublished(post);

                return (
                  <article
                    key={id}
                    className="rounded-2xl border bg-card p-5"
                  >
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="mb-3 flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              published
                                ? "bg-green-100 text-green-800"
                                : "bg-secondary text-secondary-foreground"
                            }`}
                          >
                            {published ? "Published" : "Draft"}
                          </span>

                          {Array.isArray(post.tags) &&
                            post.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full border px-2 py-1 text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                        </div>

                        <h3 className="break-words text-lg font-semibold">
                          {post.title}
                        </h3>

                        <p className="mt-2 text-sm text-muted-foreground">
                          {post.excerpt}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
                          <span>Created: {formatDate(post.createdAt)}</span>
                          {post.publishedAt && (
                            <span>
                              Published: {formatDate(post.publishedAt)}
                            </span>
                          )}
                        </div>

                        <p className="mt-2 break-all text-xs text-muted-foreground">
                          Slug: {post.slug}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 lg:justify-end">
                        <button
                          type="button"
                          onClick={() => handleEdit(post)}
                          disabled={isBusy}
                          className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition hover:bg-secondary disabled:opacity-50"
                        >
                          <Pencil size={14} />
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handlePublishToggle(post)}
                          disabled={isBusy}
                          className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition hover:bg-secondary disabled:opacity-50"
                        >
                          {isBusy ? (
                            <LoaderCircle size={14} className="animate-spin" />
                          ) : published ? (
                            <EyeOff size={14} />
                          ) : (
                            <Send size={14} />
                          )}
                          {isBusy
                            ? "Please wait..."
                            : published
                              ? "Unpublish"
                              : "Publish"}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(post)}
                          disabled={isBusy}
                          className="inline-flex items-center gap-2 rounded-lg border border-destructive/40 px-3 py-2 text-sm text-destructive transition hover:bg-destructive/5 disabled:opacity-50"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
