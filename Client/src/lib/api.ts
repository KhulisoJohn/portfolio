const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export interface ContactPayload {
    name: string;
    email: string,
    message: string;
}

export interface BlogPostSummary {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    coverImageUrl?: string;
    tags: string[];
    createdAt: string;
}

export interface BlogPostDetails extends BlogPostSummary {
    content: string;
    updatedAt: string;
}

async function handleResponse<T>(res: Response): Promise<T> {
    if (!res.ok) {
        let message = `Request failed with status ${res.status}`;
        try {
            const data = await res.json();
            message = data.message || message;
        } catch{

        }
        throw new Error(message);
    }

    if (res.status === 204) return undefined as T;
    return res.json() as Promise<T>;
}

export async function submitContactForm(payload: ContactPayload) : Promise<{message: string}> {
    const res = await fetch (`${API_BASE_URL}/contact`, {
        method : "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload),
    });
    return handleResponse(res);
}

export async function getBlogPosts() : Promise<BlogPostSummary[]> {
  const res = await fetch(`${API_BASE_URL}/blog`);
  return handleResponse(res);  
}

export async function getBlogPostSlug(slug: string) : Promise<BlogPostDetails> {
   const res = await fetch (`${API_BASE_URL}/blog/${slug}`);
   return handleResponse(res); 
}