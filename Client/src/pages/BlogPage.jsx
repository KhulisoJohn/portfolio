import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBlogPosts } from "../lib/api";
import { PageHeader } from "../components/PageHeader";
import { usePageTitle } from "../hooks/usePageTitle";

export const BlogPage = () => {
  usePageTitle("Blog | Khuliso Thavhiwa");

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPosts = useCallback(() => {
    setIsLoading(true);
    setError(null);

    getBlogPosts()
      .then(setPosts)
      .catch((err) => {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load posts"
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  return (
    <>
      <PageHeader title="The" highlight="Blog">
        Notes on building software, community-driven projects, and lessons
        along the way.
      </PageHeader>

      <section className="pb-24 px-4 min-h-[50vh] relative">
        <div className="container mx-auto max-w-5xl">
          {isLoading && (
            <p className="text-center text-muted-foreground">
              Loading posts... The server may need a few seconds to wake up.
            </p>
          )}

          {error && (
            <div className="text-center">
              <p className="text-destructive mb-4">{error}</p>

              <button
                onClick={loadPosts}
                className="cosmic-button"
                type="button"
              >
                Try again
              </button>
            </div>
          )}

          {!isLoading && !error && posts.length === 0 && (
            <p className="text-center text-muted-foreground">
              No posts published yet. Check back soon.
            </p>
          )}

          {!isLoading && !error && posts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover block"
                >
                  {post.coverImageUrl && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={post.coverImageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    {post.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
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

                    <h2 className="text-xl font-semibold mb-2">
                      {post.title}
                    </h2>

                    <p className="text-muted-foreground text-sm mb-3">
                      {post.excerpt}
                    </p>

                    <span className="text-xs text-muted-foreground">
                      {new Date(post.createdAt).toLocaleDateString("en-ZA", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default BlogPage;