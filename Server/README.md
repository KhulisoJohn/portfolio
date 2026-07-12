# Frontend updates (Portfolio React app)

These files add real backend integration to your existing React/TypeScript portfolio: a working contact form and a new blog section, both talking to `PortfolioApi`.

## What's in here

```
frontend-updates/
├── lib/api.ts                  API client (fetch wrappers, typed responses)
├── components/ContactSection.tsx   Updated contact form (replaces your current one)
├── pages/BlogPage.tsx              Blog listing page
└── pages/BlogPostPage.tsx          Single blog post page
```

## Requirements

- Your existing Vite + React + TypeScript + Tailwind portfolio project
- `react-router-dom` (for `/blog` and `/blog/:slug` routes)

Check if you already have it:
```bash
cat package.json | grep react-router-dom
```
If not:
```bash
npm install react-router-dom
```

## 1. Copy files in

- `lib/api.ts` → `src/lib/api.ts`
- `components/ContactSection.tsx` → overwrite your existing `src/components/ContactSection.tsx`
- `pages/BlogPage.tsx` → `src/pages/BlogPage.tsx`
- `pages/BlogPostPage.tsx` → `src/pages/BlogPostPage.tsx`

## 2. Add routes

In your router setup (likely `App.tsx` or `main.tsx`):

```tsx
import { BlogPage } from "@/pages/BlogPage";
import { BlogPostPage } from "@/pages/BlogPostPage";

// inside your <Routes>
<Route path="/blog" element={<BlogPage />} />
<Route path="/blog/:slug" element={<BlogPostPage />} />
```

## 3. Add a nav link

In `Footer.tsx` (or your nav), add a link to `/blog` alongside your existing `#hero`/`#about`/etc. anchors.

## 4. Environment variable

Create `.env` in your project root:
```
VITE_API_URL=http://localhost:5000/api
```

For production, set the same variable to your deployed Render API URL (e.g. `https://portfolio-api.onrender.com/api`) wherever you host the frontend (Vercel/Netlify env settings).

## 5. Run

```bash
npm run dev
```

With the backend also running locally, test:
- Submit the contact form → check your email inbox and the `contactMessages` collection in Atlas
- Visit `/blog` → should show "No posts published yet" until you create one via the API

## Notes

- Blog post content renders as plain text with line breaks preserved. To support Markdown, install `react-markdown` and swap the content `<div>` in `BlogPostPage.tsx` for `<ReactMarkdown>{post.content}</ReactMarkdown>`.
- There's no admin UI yet for writing posts — use Postman (or similar) against `POST /api/blog` with your JWT until one exists.
