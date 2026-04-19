# Dekadraj

A full-stack editorial publishing platform for long-form Turkish film criticism and essays. Built with Next.js App Router, Sanity CMS, and Tailwind CSS — deployed on Vercel.

**Live site:** [dekadraj-tuluyhansozens-projects.vercel.app](https://dekadraj-tuluyhansozens-projects.vercel.app)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + Tailwind Typography |
| CMS | Sanity (headless, embedded Studio at `/studio`) |
| Forms | React Hook Form + Zod |
| Email | Resend (transactional) |
| Newsletter | Mailchimp |
| Deployment | Vercel |

## Features

- **Article publishing** — rich text via Sanity Portable Text with image, caption, and blockquote support
- **Author profiles** — dedicated pages per author with their article archive
- **Category & topic filtering** — multi-level taxonomy with URL-based filter state
- **Full-text search** — client-side search across the article archive
- **Pagination** — 18 articles per page
- **Related articles** — same-category recommendations, falls back to recent posts
- **Newsletter subscription** — Mailchimp integration with a popup on page load
- **Contact form** — Resend-powered email delivery with honeypot spam protection
- **Sanity Studio** — embedded CMS at `/studio` for content editors
- **ISR** — on-demand revalidation via webhook at `/api/revalidate`
- **Responsive** — mobile hamburger nav, mobile share buttons, accessible focus states (WCAG AA)

## Project Structure

```
app/
├── api/              # contact, newsletter, revalidate routes
├── hakkimizda/       # about page
├── iletisim/         # contact page
├── studio/           # embedded Sanity Studio
├── yazarlar/[slug]/  # author profile pages
└── yazilar/          # archive + article detail pages
components/           # all UI components
lib/                  # Sanity client, image builder, env validation
sanity/
├── schemas/          # article, author, category, topic, siteSettings
└── sanity.config.ts
```

## Getting Started

### Prerequisites

- Node.js 20+
- A [Sanity](https://sanity.io) project
- A [Resend](https://resend.com) account (contact form)
- A [Mailchimp](https://mailchimp.com) account (newsletter)

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token

RESEND_API_KEY=your_key
CONTACT_EMAIL=your@email.com

MAILCHIMP_API_KEY=your_key
MAILCHIMP_SERVER_PREFIX=us1
MAILCHIMP_LIST_ID=your_list_id

REVALIDATE_SECRET=your_secret
```

### Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The Sanity Studio is at [http://localhost:3000/studio](http://localhost:3000/studio).

## Development

This project was developed with [Claude Code](https://claude.ai/code) (AI-assisted development), iterating through Figma-to-code translation, accessibility audits, and production hotfixes via natural-language collaboration.

## License

MIT
