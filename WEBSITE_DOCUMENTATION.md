# AsanShipping Website — Architecture, Component & SEO Integration Documentation

**Project Name:** AsanShipping Public Website & SEO Knowledge Hub  
**Directory:** `website/`  
**Port:** `3001` (Development: `http://localhost:3001`)  
**Framework:** Next.js 14.2 (App Router), React 18, TypeScript, Tailwind CSS, Lucide Icons, Next Themes  

---

## 1. Overview & Ecosystem Architecture

The `website/` directory contains the official public marketing website and SEO publication hub for AsanShipping. It is decoupled from the merchant administration dashboard while seamlessly connected to the same core backend and data layers.

### Multi-Service Ports Map

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                            AsanShipping Ecosystem                           │
├──────────────────────┬──────────────────────┬───────────────────────────────┤
│ Service              │ Port                 │ Technology & Purpose          │
├──────────────────────┼──────────────────────┼───────────────────────────────┤
│ Core Backend API     │ http://localhost:5000│ Express, MongoDB, BullMQ, Auth│
│ Merchant Admin Portal│ http://localhost:8080│ React, Vite, Tailwind, UI     │
│ Public Website & SEO │ http://localhost:3001│ Next.js 14 App Router, ISR    │
│ MegaTrix SEO Agent   │ http://localhost:3000│ Autonomous Article Publisher  │
└──────────────────────┴──────────────────────┴───────────────────────────────┘
```

---

## 2. Directory Structure & File Map

```text
website/
├── app/
│   ├── articles/
│   │   ├── [slug]/
│   │   │   └── page.tsx              # Dynamic article detail with JSON-LD & OpenGraph
│   │   └── page.tsx                  # Articles directory with category filtering
│   ├── globals.css                   # Tailwind tokens, dark mode & animations
│   ├── layout.tsx                    # Root HTML layout, font injection, ThemeProvider
│   ├── page.tsx                      # Main Landing Page with interactive simulator
│   ├── robots.ts                     # Search engine crawler directives
│   └── sitemap.ts                    # Dynamic XML sitemap generator
├── components/
│   ├── ArchitectureFlow.tsx          # 4-stage visual order lifecycle pipeline
│   ├── ArticleCard.tsx               # Reusable article card for catalog & related guides
│   ├── CourierMatrix.tsx             # Comparison matrix for TCS, Trax, PostEx, Leopards, M&P
│   ├── FaqSection.tsx                # Interactive FAQ accordion
│   ├── FeatureHighlights.tsx         # Proof points, testimonials & security guarantees
│   ├── Footer.tsx                    # 4-column structured footer with modals
│   ├── InteractiveHero.tsx           # Interactive Hero with real-time order simulator
│   ├── Modals.tsx                    # Connect Shopify, Waybill, Privacy, Terms & Vision modals
│   ├── Navbar.tsx                    # Responsive navigation bar with dark mode toggle
│   ├── PricingSection.tsx            # Transparent 3-tier SaaS pricing cards
│   ├── RoiCalculator.tsx             # Interactive COD margin recovery calculator
│   ├── ThemeProvider.tsx             # next-themes wrapper for dark/light themes
│   └── ThemeToggle.tsx               # Minimalist sun/moon toggle switch
├── lib/
│   ├── api.ts                        # Server-side API client connecting to backend (5000)
│   ├── types.ts                      # TypeScript models for articles and API responses
│   └── utils.ts                      # Reading time calculator, date formatter, clsx helper
├── public/
│   └── images/                       # Courier logos, screenshots, brand assets
├── .env.local                        # Local runtime environment variables
├── .env.local.example                # Environment configuration template
├── next.config.mjs                   # Next.js configuration (images, domains)
├── package.json                      # Next.js dependencies & scripts
├── tailwind.config.ts                # Tailwind design system tokens & colors
└── tsconfig.json                     # Strict TypeScript compiler options
```

---

## 3. Pages & Routes Specification

### 1. Landing Page (`/` ➔ `app/page.tsx`)
- **Type:** Client Component (`"use client"`).
- **Components Loaded:**
  - `Navbar`: Sticky navigation with links to `#simulator`, `#how-it-works`, `#couriers`, `#calculator`, `#pricing`, `/articles`, and login redirect to `https://web.asanshipping.com/login`.
  - `InteractiveHero`: Features a live interactive simulator allowing users to test order risk screening, simulated WhatsApp button interaction, and real-time courier booking.
  - `ArchitectureFlow`: 4-stage breakdown (Intake, Screening, Intelligent Routing, Reverse Logistics).
  - `CourierMatrix`: Deep dive into TCS Express, PostEx COD, Trax Logistics, Leopards Courier, and M&P Express with SLAs, API latency, and coverage.
  - `RoiCalculator`: Interactive range sliders for monthly COD orders, average order value (AOV), and return rate (RTO), computing recoverable margin.
  - `FeatureHighlights`: Key capabilities and customer testimonials.
  - `PricingSection`: Transparent tiers (Starter D2C `PKR 4,999/mo`, Growth Scaler `PKR 9,999/mo`, Enterprise Tower `PKR 24,999/mo`).
  - `FaqSection`: Comprehensive answers to common logistics, integration, and pricing questions.
  - `Footer`: Structured 4-column navigation with modal triggers.
  - `Modals`: Connect Shopify Store modal, Waybill PDF preview modal, Privacy Policy, Terms of Service, and Company Vision.

### 2. Articles Catalog (`/articles` ➔ `app/articles/page.tsx`)
- **Type:** Server Component with Incremental Static Regeneration (ISR).
- **Features:**
  - Dynamic category filtering (`/articles?category=Couriers`, etc.).
  - Reads published articles from core backend via `fetchPublishedArticles()`.
  - Responsive 3-column article grid using `ArticleCard`.
  - Clean pagination controls (`?page=1`, `?page=2`).
  - OpenGraph and Twitter card metadata for high SEO click-through rate.

### 3. Article Detail View (`/articles/[slug]` ➔ `app/articles/[slug]/page.tsx`)
- **Type:** Dynamic Server Component (`generateMetadata` + Page).
- **SEO & Schema Capabilities:**
  - **Dynamic Metadata:** Generates custom `title`, `metaDescription`, `canonicalUrl`, and OpenGraph tags per article.
  - **Schema.org Structured Data (JSON-LD):** Injects a `<script type="application/ld+json">` with `BlogPosting` specification, author attribution, publication timestamp, and organization logo.
  - **Reading Time:** Automatically calculated from content word count using `calculateReadingTime()`.
  - **Social Sharing:** Quick buttons to share articles directly to WhatsApp, LinkedIn, X, and Facebook.
  - **Related Articles:** Automatically displays up to 3 related articles matching category or recent publications.

### 4. Dynamic Sitemap (`/sitemap.xml` ➔ `app/sitemap.ts`)
- Dynamically queries all published article slugs from the backend API.
- Generates a search-engine compliant `sitemap.xml` containing the homepage, articles directory, and every individual article URL with updated modification timestamps.

### 5. Robots Directives (`/robots.txt` ➔ `app/robots.ts`)
- Directs search engines to crawl all public pages while protecting private API endpoints.
- Points crawlers directly to `http://localhost:3001/sitemap.xml`.

---

## 4. CMS & MegaTrix SEO Agent Publishing Integration

AsanShipping features a dedicated, secure publishing gateway enabling the **MegaTrix SEO Agent** (or any CMS pipeline) to automatically discover topics, generate articles, and publish them directly to the website.

### API Publishing Endpoints

| Endpoint | Method | Purpose | Auth Required |
| :--- | :--- | :--- | :--- |
| `http://localhost:5000/api/integrations/seo/articles` | `POST` | Create or update article from SEO Agent | `x-api-key` or Bearer token |
| `http://localhost:5000/api/public/articles` | `GET` | List published articles with pagination & filter | Public |
| `http://localhost:5000/api/public/articles/:slug` | `GET` | Retrieve single published article by slug | Public |
| `http://localhost:5000/api/public/articles/categories` | `GET` | Retrieve distinct published article categories | Public |

### Authentication Header
Every publishing request from the SEO Agent must include:
```http
x-api-key: seo_megatrix_secret_agent_key_2026
```
*(Or `Authorization: Bearer seo_megatrix_secret_agent_key_2026`)*

### Publishing Payload Specification (JSON)

```json
{
  "title": "Top 5 Courier Services for Shopify Stores in Pakistan (2026 Comparison)",
  "slug": "best-courier-services-in-pakistan",
  "excerpt": "In-depth comparison of TCS, Trax, Leopards, PostEx, and M&P: tariffs, SLA performance, rural coverage, and API reliability.",
  "content": "Selecting the right courier partner directly affects your delivery success rate. Here is an unbiased review...",
  "contentHtml": "<h2>Comparing TCS, Leopards, Trax, PostEx, and M&P</h2><p>Here is an operational breakdown of tariffs, SLAs, and API capabilities.</p>",
  "featuredImage": "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1200&q=80",
  "imageAlt": "Pakistan Courier Services Comparison 2026",
  "category": "Couriers",
  "tags": ["Couriers", "TCS", "PostEx", "Trax", "Leopards", "M&P"],
  "author": {
    "name": "AsanShipping Team",
    "role": "Logistics & Ecommerce Specialist",
    "avatar": ""
  },
  "status": "published",
  "publishedAt": "2026-09-16T00:00:00.000Z",
  "metaTitle": "Top 5 Courier Services for Shopify Stores in Pakistan (2026 Comparison)",
  "metaDescription": "Compare TCS, Trax, PostEx, Leopards, and M&P tariffs, SLAs, and COD remittance speeds for Pakistani Shopify merchants.",
  "canonicalUrl": "http://localhost:3001/articles/best-courier-services-in-pakistan",
  "primaryKeyword": "best courier service in pakistan for shopify",
  "secondaryKeywords": ["cod courier pakistan", "tcs vs postex", "trax logistics api", "leopards cod rates"],
  "externalId": "megatrix-seo-art-002",
  "structuredData": null
}
```

### Response Contract

**Success (HTTP 200 / 201):**
```json
{
  "success": true,
  "message": "Article published successfully",
  "isUpdate": false,
  "data": {
    "_id": "6aa9a3e66f6f3695789e83d8",
    "title": "Top 5 Courier Services for Shopify Stores in Pakistan (2026 Comparison)",
    "slug": "best-courier-services-in-pakistan",
    "category": "Couriers",
    "status": "published",
    "publishedAt": "2026-09-16T00:00:00.000Z",
    "project": "asanshipping",
    "externalId": "megatrix-seo-art-002"
  }
}
```

---

## 5. Environment Configuration Guide

### `website/.env.local`
Configured inside `website/.env.local`:
```env
# Backend API URL for server-side fetching
ASANSHIPPING_API_URL=http://localhost:5000

# Canonical public site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3001

# Merchant portal login destination
NEXT_PUBLIC_APP_LOGIN_URL=https://web.asanshipping.com/login

# Publishing API endpoint for SEO Agent
SEO_AGENT_PUBLISH_URL=http://localhost:5000/api/integrations/seo/articles
SEO_AGENT_API_KEY=seo_megatrix_secret_agent_key_2026
```

### `c:\Users\hashi\SEO Agent\.env.local`
Configured inside `SEO Agent/.env.local` to enable automatic publishing:
```env
# AsanShipping Publishing API Target
ASANSHIPPING_API_URL=http://localhost:5000/api/integrations/seo/articles
ASANSHIPPING_API_KEY=seo_megatrix_secret_agent_key_2026
ASANSHIPPING_PUBLIC_WEBSITE_URL=http://localhost:3001
```

---

## 6. How to Run Locally

### Running Everything Concurrently (Root `package.json`)
From the root workspace directory:

```bash
# Starts Core Backend (5000), Merchant Admin Portal (8080), Public Website (3001), and Ngrok
npm run dev
```

### Running Website Independently
From the root workspace directory:

```bash
# Runs Next.js website dev server on port 3001
npm run dev:website
```

Or from inside `website/`:

```bash
cd website
npm run dev
```

The website will be available immediately at **`http://localhost:3001`**.

---

## 7. Vercel Deployment Architecture & Auto-Detection

### Separate Vercel Project Deployment (Recommended Monorepo Pattern)
The `website/` application is deployed as an independent project on Vercel:
- **Project Name:** `asanshipping-website`
- **Root Directory:** `website`
- **Framework Preset:** Next.js
- **Primary Domains:** `asanshipping.com`, `www.asanshipping.com`

### Auto-Detection via `website/vercel.json`
Vercel automatically detects the build command, Next.js framework, and security headers using `website/vercel.json`:
```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "nextjs",
  "buildCommand": "next build",
  "devCommand": "next dev -p 3001",
  "installCommand": "npm install",
  "cleanUrls": true
}
```

### Production Environment Variables
- `NEXT_PUBLIC_API_URL`: Core API backend (e.g. `https://api.asanshipping.com`)
- `NEXT_PUBLIC_APP_LOGIN_URL`: Merchant app portal (e.g. `https://app.asanshipping.com/login`)
- `NEXT_PUBLIC_SITE_URL`: Canonical domain (`https://asanshipping.com`)
