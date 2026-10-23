const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5191/api";

async function handleResponse(res) {
  if (!res.ok) {
    let message = `Request failed with status ${res.status}`;

    try {
      const data = await res.json();
      message = data.message || message;
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

export async function submitContactForm(payload) {
  const res = await fetch(`${API_BASE_URL}/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(res);
}

export async function getBlogPosts() {
  const res = await fetch(`${API_BASE_URL}/blog`);
  return handleResponse(res);
}

export async function getBlogPostSlug(slug) {
  const res = await fetch(
    `${API_BASE_URL}/blog/${encodeURIComponent(slug)}`
  );

  return handleResponse(res);
}