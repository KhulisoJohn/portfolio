import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getBlogPostSlug } from "../lib/api.js";
import { usePageTitle } from "../hooks/usePageTitle.js";

export const BlogPostPage = () => {
  const { slug } = useParams();

  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  usePageTitle(
    post
      ? `${post.title} | Khuliso Thavhiwa`
      : "Blog | Khuliso Thavhiwa"
  );

  useEffect(() => {
    if (!slug) {
      setError("Blog post not found");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    setPost(null);

    getBlogPostSlug(slug)
      .then(setPost)
      .catch((err) => {
        setError(
          err instanceof Error ? err.message : "Post not found"
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [slug]);

  if (isLoading) {
    return (
      <p className="text-center pt-40 pb-24 text-muted-foreground relative">
        Loading post...
      </p>
    );
  }

  if (error || !post) {
    return (
      <div className="text-center pt-40 pb-24 relative">
        <p className="text-destructive mb-4">
          {error || "Post not found"}
        </p>

        <Link
          to="/blog"
          className="text-primary hover:underline"
        >
          Back to blog
        </Link>
      </div>
    );
  }

  return (
    <article className="pt-36 pb-24 px-4 relative">
      <div className="container mx-auto max-w-3xl text-left">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to blog
        </Link>

        {post.coverImageUrl && (
          <img
            src={post.coverImageUrl}
            alt={post.title}
            className="w-full h-64 object-cover rounded-lg mb-8"
          />
        )}

        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          {post.title}
        </h1>

        <p className="text-sm text-muted-foreground mb-10">
          {new Date(post.createdAt).toLocaleDateString("en-ZA", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <div className="max-w-none whitespace-pre-wrap text-muted-foreground leading-relaxed">
          {post.content}
        </div>
      </div>
    </article>
  );
};

export default BlogPostPage;