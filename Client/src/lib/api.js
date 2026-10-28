const  API_BASE_URL =
  (import.meta.env.VITE_API_URL ||
    'https://portfolio-1rww.onrender.com/api').replace(/\/+$/, '');


async function handleResponse(res) {
  if (!res.ok) {
    let message = `Request failed with status ${res.status}`;

    try {
      const data = await res.json();
      message = data.message || data.title || message;

      if (data.errors) {
        const validationMessages = Object.values(data.errors)
          .flat()
          .join(" ");

        if (validationMessages) {
          message = validationMessages;
        }
      }
    } catch {
      // Keep the default error message if the response isn't JSON.
    }

    throw new Error(message);
  }

  if (res.status === 204) {
    return undefined;
  }

  return res.json();
}

async function apiRequest(path, options = {}) {
  const token = localStorage.getItem("adminToken");

  const headers = {
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  return handleResponse(res);
}

// Contact form
export async function submitContactForm(payload) {
  return apiRequest("/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// Public blog: published posts
export async function getBlogPosts() {
  return apiRequest("/blog");
}

// Public blog: one post by slug
export async function getBlogPostSlug(slug) {
  return apiRequest(`/blog/${encodeURIComponent(slug)}`);
}

// Admin blog: all posts, including drafts
export async function getAdminBlogPosts() {
  return apiRequest("/blog/admin");
}

// Admin blog: create a post
export async function createBlogPost(payload) {
  return apiRequest("/blog", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// Admin blog: update a post
export async function updateBlogPost(id, payload) {
  return apiRequest(`/blog/${encodeURIComponent(id)}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

// Admin blog: publish a post
export async function publishBlogPost(id) {
  return apiRequest(
    `/blog/${encodeURIComponent(id)}/publish`,
    { method: "POST" }
  );
}

// Admin blog: unpublish a post
export async function unpublishBlogPost(id) {
  return apiRequest(
    `/blog/${encodeURIComponent(id)}/unpublish`,
    { method: "POST" }
  );
}

// Admin blog: delete a post
export async function deleteBlogPost(id) {
  return apiRequest(`/blog/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}
