
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, CalendarDays, Clock3 } from "lucide-react";

import { getBlogPostSlug } from "../lib/api.js";
import { usePageTitle } from "../hooks/usePageTitle.js";

const formatDate = (value) => {
  if (!value) return null;

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return null;

  return date.toLocaleDateString("en-ZA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const estimateReadingTime = (content = "") => {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
};

export const BlogPostPage = () => {
  const { slug } = useParams();

  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  usePageTitle(
    post
      ? `${post.title} | Khuliso Thavhiwa`
      : "Blog | Khuliso Thavhiwa"
  );

  useEffect(() => {
    let isMounted = true;

    const loadPost = async () => {
      if (!slug) {
        setError("Blog post not found.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError("");
      setPost(null);

      try {
        const result = await getBlogPostSlug(slug);

        if (isMounted) {
          setPost(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : "Unable to load this article."
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadPost();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (isLoading) {
    return (
      <main className="min-h-[60vh] px-4 pt-40 pb-24">
        <p className="text-center text-muted-foreground">
          Loading article...
        </p>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="min-h-[60vh] px-4 pt-40 pb-24">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-2xl font-bold mb-3">
            Article unavailable
          </h1>

          <p className="text-destructive mb-6">
            {error || "This blog post could not be found."}
          </p>

          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <ArrowLeft size={16} />
            Back to blog
          </Link>
        </div>
      </main>
    );
  }

  const articleDate = formatDate(post.publishedAt || post.createdAt);
  const readingTime = estimateReadingTime(post.content);

  return (
    <main className="pt-32 md:pt-36 pb-24 px-4">
      <article className="mx-auto max-w-4xl">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to all articles
        </Link>

        <header className="mb-10">
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-5">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
              {post.excerpt}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            {articleDate && (
              <span className="inline-flex items-center gap-2">
                <CalendarDays size={16} />
                {articleDate}
              </span>
            )}

            <span className="inline-flex items-center gap-2">
              <Clock3 size={16} />
              {readingTime} min read
            </span>
          </div>
        </header>

        {post.coverImageUrl && (
          <div className="mb-10 overflow-hidden rounded-xl border">
            <img
              src={post.coverImageUrl}
              alt={post.title}
              className="w-full max-h-[500px] object-cover"
              fetchPriority="high"
            />
          </div>
        )}

        <div
          className="prose prose-lg dark:prose-invert max-w-none
            prose-headings:font-bold
            prose-headings:tracking-tight
            prose-a:text-primary
            prose-a:underline-offset-4
            prose-img:rounded-xl
            prose-pre:overflow-x-auto
            prose-pre:rounded-xl
            prose-blockquote:border-l-primary
            prose-hr:border-border"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ children, href, ...props }) => {
                const isExternal =
                  href && /^https?:\/\//i.test(href);

                return (
                  <a
                    href={href}
                    {...props}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                  >
                    {children}
                  </a>
                );
              },
            }}
          >
            {post.content || ""}
          </ReactMarkdown>
        </div>

        <footer className="mt-14 pt-8 border-t">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <ArrowLeft size={16} />
            Read more articles
          </Link>
        </footer>
      </article>
    </main>
  );
};

export default BlogPostPage;
