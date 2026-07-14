import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft} from "lucide-react";
import { getBlogPostSlug, type BlogPostDetails} from "../lib/api"

export const BlogPostPage = () => {
    const { slug } = useParams<{ slug: string }> ();
    const [post, setPost] = useState<BlogPostDetails | null>(null);
    const [isLoading, setIsLoadig] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!slug) return;
        setIsLoadig(true)
        getBlogPostSlug(slug)
            .then(setPost)
            .catch((err) => setError(err instanceof Error ? err.message : "Post not found"))
            .finally(() => setIsLoadig(false));
    }, [slug]);

    if (isLoading) {
        return <p className="text-center py-24 text-muted-foreground"> Loading post.....</p>
    }

    if (error || !post) {
        return (
            <div className="text-center py-24">
                <p className="text-destructive mb-4">{error || "Post not found"}</p>
                <Link to="./blog" className="text-primary hover:underline">
                    Back to blog
                </Link>
            </div>
        );
    }

    return (
        <article className="py-24 px-4">
            <div className="container mx-auto max-w-3xl">
                <Link 
                    to= "./blog"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
                        <ArrowLeft size={16} /> Back to blog
                </Link>

                {post.coverImageUrl && (
                    <img 
                        src={post.coverImageUrl}
                        alt={post.title}
                        className="w-full h-64 object-cover rounded-lg mb-8"
                    />
                )}

                <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                        <span 
                            key={tag}
                            className="px-2 py-1 text-xs font-medium border-full bg-secondary text-secondary-foreground">
                            {tag}
                        </span>
                    ))}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-3">{post.title}</h1>
                <p className="text-sm text-muted-foreground mb-10">
                    {new Date(post.createdAt).toLocaleDateString("en-ZA", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </p>

                <div className="prose prose-invert max-w-none whitespace-pre-wrap text-muted-foreground leading-relaxed">
                    {post.content}
                </div>
            </div>
        </article>
    );
};