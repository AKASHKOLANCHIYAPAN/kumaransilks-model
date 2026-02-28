# Kumaran Silks & Sarees — Tech Stack Recommendation 2026

## Recommended Stack

| Layer | Technology | Version | Rationale |
|-------|-----------|---------|-----------|
| **Framework** | Next.js | 15+ | App Router, RSC, ISR for blazing-fast pages with SEO |
| **Styling** | Tailwind CSS | 4.x | Utility-first, tree-shaking, design tokens via config |
| **Headless CMS** | Sanity.io | 3.x | Real-time collaboration, bilingual content natively |
| **Commerce** | MedusaJS or Shopify Hydrogen | Latest | Open-source (Medusa) or enterprise (Shopify) |
| **Database** | PostgreSQL via Supabase | 15+ | Auth, real-time, row-level security |
| **CDN / Hosting** | Vercel | Edge Network | Native Next.js deployment, edge functions |
| **Image Optimization** | Next/Image + Cloudinary | — | Auto `.avif`/`.webp`, responsive srcset, lazy loading |
| **Search** | Algolia or Meilisearch | — | Instant bilingual product search |
| **Payments** | Razorpay | — | Indian payment gateway, UPI, cards, wallets |
| **Maps** | Google Maps JavaScript API | 3.x | Custom-styled map embed |

## Core Web Vitals Targets

| Metric | Target | Strategy |
|--------|--------|----------|
| **LCP** | < 2.0s | Preload hero images, use `priority` on above-fold images |
| **FID** | < 100ms | Minimize main thread blocking, defer non-critical JS |
| **CLS** | < 0.1 | Set explicit width/height on all images, font-display: swap |
| **TTFB** | < 200ms | Edge deployment, ISR, efficient API routes |

## Image Strategy

- All product images in `.webp` format (with `.avif` fallback for supported browsers)
- Use `<picture>` element with responsive `srcset` for different screen sizes
- Lazy load all below-fold images with `loading="lazy"` and `decoding="async"`
- Hero images preloaded via `<link rel="preload">`
- Target file size: < 100KB per product image, < 200KB for hero images

## Bilingual Architecture (Production)

```
/app
├── [locale]/             ← Dynamic locale segment (en / ta)
│   ├── layout.tsx        ← Locale-aware layout with direction
│   ├── page.tsx          ← Homepage
│   ├── collections/
│   │   ├── page.tsx      ← All collections
│   │   └── [slug]/
│   │       └── page.tsx  ← Category page
│   └── product/
│       └── [slug]/
│           └── page.tsx  ← Product detail
├── i18n/
│   ├── en.json
│   └── ta.json
└── middleware.ts          ← Auto-detect locale, redirect
```

## Current Showcase Implementation

For this Digital Flagship showcase, we use a lightweight approach:

- **Vite 6** for instant HMR and development speed
- **Vanilla CSS** with CSS custom properties for full design control
- **Vanilla JavaScript (ES Modules)** for zero-dependency interactivity
- **JSON-based i18n** with `data-i18n` attribute binding

This architecture is intentionally modular so each component can be directly migrated to React/Next.js components when transitioning to full production.
