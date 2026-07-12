# PortfolioApi (Backend)

ASP.NET Core Web API for the portfolio's contact form and blog, using MongoDB Atlas and Brevo.

## Requirements

- .NET 9 SDK
- A MongoDB Atlas cluster (free tier is fine)
- A Brevo account with an API key

## Project layout

```
PortfolioApi/
├── Controllers/       HTTP endpoints (Contact, Blog, Auth)
├── Services/           Business logic (email sending, blog CRUD, auth)
├── Data/                MongoDbContext + strongly-typed settings classes
├── Models/              MongoDB document models
├── DTOs/                Request/response shapes
├── Program.cs           App startup, DI, JWT + CORS config
└── appsettings.json     Configuration (fill in before running)
```

## 1. Configure

Open `appsettings.json` and fill in:

| Key | Where to get it |
|---|---|
| `MongoSettings:ConnectionString` | MongoDB Atlas → Connect → Drivers |
| `BrevoSettings:ApiKey` | Brevo dashboard → SMTP & API → API Keys |
| `BrevoSettings:SenderEmail` / `RecipientEmail` | Your verified sender + your inbox |
| `JwtSettings:Secret` | Any random 32+ character string |
| `AdminUser:PasswordHash` | See "Generate an admin password hash" below |
| `CorsSettings:AllowedOrigins` | Your frontend's local + production URLs |

### Generate an admin password hash

```bash
dotnet new console -n HashGen
cd HashGen
dotnet add package BCrypt.Net-Next
```

Replace the contents of `Program.cs` with:
```csharp
Console.WriteLine(BCrypt.Net.BCrypt.HashPassword("your-chosen-password"));
```

```bash
dotnet run
```

Copy the printed hash into `AdminUser:PasswordHash`, then delete the `HashGen` folder.

## 2. Install & run

```bash
cd PortfolioApi
dotnet restore
dotnet run
```

Swagger UI: `https://localhost:{port}/swagger` (dev environment only).

## 3. API reference

### `POST /api/contact`
```json
{ "name": "Jane Doe", "email": "jane@example.com", "message": "Hi Khuliso..." }
```
Sends an email via Brevo and saves a copy to MongoDB. No auth required.

### `GET /api/blog`
Returns published posts (summary: title, slug, excerpt, tags, cover image, date).

### `GET /api/blog/{slug}`
Returns full post content for one post.

### `POST /api/auth/login`
```json
{ "username": "khuliso", "password": "your-chosen-password" }
```
Returns `{ "token": "...", "expiresAt": "..." }`.

### `POST /api/blog` (Admin)
Header: `Authorization: Bearer {token}`
```json
{
  "title": "How I built EduPulse AI",
  "excerpt": "A short teaser...",
  "content": "Full post body...",
  "coverImageUrl": "https://...",
  "tags": ["dotnet", "react"],
  "isPublished": true
}
```
Slug is auto-generated from the title.

### `PUT /api/blog/{id}` (Admin)
Same body shape as create. Requires the JWT.

### `DELETE /api/blog/{id}` (Admin)
Requires the JWT. Returns `204 No Content`.

## 4. Deploy to Render

Build command: `dotnet publish -c Release -o out`
Start command: `dotnet out/PortfolioApi.dll`

Set these as environment variables in the Render dashboard (double underscore for nested config, matching your CurriculumReviewSystem setup):

```
MongoSettings__ConnectionString
BrevoSettings__ApiKey
BrevoSettings__SenderEmail
BrevoSettings__RecipientEmail
JwtSettings__Secret
AdminUser__Username
AdminUser__PasswordHash
CorsSettings__AllowedOrigins__0
CorsSettings__AllowedOrigins__1
```

Do **not** commit real secrets into `appsettings.json` if this repo is public — use environment variables in production and keep placeholders in the committed file.

## Notes

- Contact messages are write-only right now — there's no endpoint to read them back except directly in MongoDB Atlas. Ask if you want a protected `GET /api/contact` list added.
- Blog content is stored as plain text. For Markdown support, no backend change needed — just render it differently on the frontend.