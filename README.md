# Khuliso Thavhiwa — Portfolio Platform

A full-stack personal portfolio site: a React/TypeScript frontend backed by an ASP.NET Core Web API, using MongoDB Atlas for data and Brevo for transactional email.

## Project structure

```
.
├── PortfolioApi/          ASP.NET Core Web API (backend)
│   └── README.md          Backend setup, config, deployment
├── frontend-updates/      React/TypeScript files to merge into your portfolio app
│   └── README.md          Frontend setup, routing, env vars
└── README.md              You are here
```

## What this project does

- **Contact form** — visitors submit a message on the portfolio site; the API emails it to Khuliso via Brevo and logs a copy in MongoDB.
- **Blog** — public read-only blog (`/blog` listing, `/blog/:slug` detail) backed by MongoDB, with JWT-protected admin endpoints to create/edit/delete posts.

## Tech stack

| Layer     | Technology |
|-----------|------------|
| Frontend  | React, TypeScript, Vite, Tailwind CSS |
| Backend   | ASP.NET Core Web API (.NET 9) |
| Database  | MongoDB Atlas |
| Email     | Brevo transactional email API |
| Auth      | JWT bearer tokens (admin-only blog writes) |
| Hosting   | Render (API), your existing static host (frontend) |

## Architecture at a glance

```
React (Vite)  ──fetch──▶  ASP.NET Core API  ──▶  MongoDB Atlas
                               │
                               └──▶ Brevo API (contact emails)
```

The API is a single ASP.NET Core project (Controllers → Services → MongoDB driver), not a multi-layer Clean Architecture setup — deliberately kept lean since the domain here (contact messages + blog posts) is small. If EduPulse-style complexity gets added later (multi-tenant, more entities), it's a natural candidate to restructure into Domain/Application/Infrastructure layers like CurriculumReviewSystem.

## Getting started

1. Read **[`PortfolioApi/README.md`](./PortfolioApi/README.md)** — set up MongoDB, Brevo, JWT secret, and run the API locally.
2. Read **[`frontend-updates/README.md`](./frontend-updates/README.md)** — merge the updated components into your existing portfolio repo and point it at the API.
3. Run both locally, confirm the contact form sends an email and the blog page loads (even with zero posts).
4. Deploy the API to Render, then update `VITE_API_URL` in your frontend's production env.

## API reference (quick summary)

| Method | Endpoint            | Auth        | Purpose                  |
|--------|----------------------|-------------|---------------------------|
| POST   | `/api/contact`        | None        | Submit contact form       |
| GET    | `/api/blog`            | None        | List published posts      |
| GET    | `/api/blog/{slug}`     | None        | Get single post           |
| POST   | `/api/blog`             | Admin (JWT) | Create post                |
| PUT    | `/api/blog/{id}`        | Admin (JWT) | Update post                |
| DELETE | `/api/blog/{id}`        | Admin (JWT) | Delete post                |
| POST   | `/api/auth/login`       | None        | Get JWT for admin actions |

Full request/response shapes are in the backend README.

## Roadmap / open items

- Admin UI for writing blog posts (currently: call the API directly, e.g. via Postman, with the JWT)
- `GET /api/contact` (protected) to view submitted messages without going into MongoDB Atlas directly
- Optional: Markdown rendering for blog post content (`react-markdown`)
- Optional: image upload for blog cover images (currently just a URL field)