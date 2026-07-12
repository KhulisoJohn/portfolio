import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBlogPosts, type BlogPostSummary } from "../lib/api"

export const BlogPage = () => {
    const [post, setPost] = useState<BlogPostSummary[]>([]);
    const [isLoading, setIsLoadig] = useState(true);
    const [ error, setError] = useState<string | null>(null);

    useEffect(() => {
        getBlogPosts()
        .then(setPost)
        .catch((err) => setError( err instanceof Error ? err.message : "Failed to load posts"))
        .finally(() => setIsLoadig(false));
        }, []);

    return (
        <section className="py-24 px-4 min-h-screen">
            <div className="container mx-auto max-w-5xl">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                    The <span className="text-primary">Blog</span>
                </h1>
                <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                    Notes on building software, community-driven projects, and leassons along the way.
                </p>

                {isLoading && <p className="text-center text-muted-foreground">Loading posts....</p>}
                {error && <p className="text-center text-destructive">{error}</p>}
                {!isLoading && !error && post.length === 0 && (
                    <p className="text-center text-muted-foregroun">NO post published yet check back soon.</p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {post.map((post) => (
                        <Link
                            key={post.id}
                            to={`./blog/${post.slug}`}
                            className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover block"
                            >
                        {post.coverImageUrl && (
                            <div className="h-48 overflow-hidden">
                                <img 
                                    src= {post.coverImageUrl}
                                    alt= {post.title}
                                    className="w-full h-full object-cover transition-tranform duration-500 group-hover:scale-110"
                                    />
                            </div>
                        )}

                        <div className="p-6">
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
                            <h2 className="text-xl font-semiblod mb-2">{post.title}</h2>
                            <p className="text-muted-foreground text-sm mb-3">{post.excerpt}</p>
                            <span className="text-xs text-muted-foreground">
                                {new Date(post.createdAt).toLocaleTimeString("en-ZA", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric"
                                })}
                            </span>
                        </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
        
    
}