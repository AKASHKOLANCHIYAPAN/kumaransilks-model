# Kumaran Silks & Sarees — Sitemap & Bilingual Routing

## URL Structure

The site uses a **single-page architecture** with anchor-based sections. Bilingual support is handled client-side via a JSON-based i18n engine, not sub-folder routing (for simplicity in the showcase phase).

### Future Production Routing (Next.js / SSR)

For SEO-optimized bilingual routing in production, use the sub-folder strategy:

```
/en/                    → English homepage
/ta/                    → Tamil homepage
/en/collections/        → English collections
/ta/collections/        → Tamil collections
/en/product/:slug       → English product detail
/ta/product/:slug       → Tamil product detail
```

## Current Single-Page Sitemap

```
index.html
├── #hero               → Hero carousel (2 slides)
├── #categories         → Curated Collections (6 silk types)
├── #products           → The Drape View (product grid + smart filters)
│   ├── Filter: Zari Type (Pure Gold / Tested / Copper)
│   ├── Filter: Weave Pattern (Mayil / Chakram / Temple Border)
│   └── Filter: Occasion (Muhurtham / Reception / Gifting)
├── #heritage           → Our Heritage (story + timeline + founder quote)
├── #testimonials       → Customer testimonials (3 cards)
├── #store              → Store location + Google Maps + Directions
└── Footer              → About, Quick Links, Collections, Newsletter
```

## Mega Menu Structure

```
Collections (hover/click)
├── By Silk Type
│   ├── Kanjivaram          / காஞ்சிவரம்
│   ├── Soft Silk            / மென் பட்டு
│   ├── Banarasi             / பனாரசி
│   ├── Tussar               / டஸ்ஸர்
│   ├── Brocade              / ப்ரோகேட்
│   └── Tissue               / டிஷ்யூ
├── By Occasion
│   ├── Muhurtham (Wedding)  / முகூர்த்தம்
│   ├── Reception            / வரவேற்பு
│   ├── Gifting              / பரிசளிப்பு
│   └── Casual & Daily Wear  / அன்றாட அணிகலன்
└── By Brand
    ├── Amrithavarshini      / அமிர்தவர்ஷிணி
    ├── PCR Collection       / PCR தொகுப்பு
    └── Lea                  / லீ
```

## i18n Data Structure (CMS Schema)

Every product entry requires **mandatory bilingual fields**:

```json
{
  "name": "Royal Maroon Kanjivaram",          // English
  "name_ta": "அரச மரூன் காஞ்சிவரம்",          // Tamil
  "desc": "Pure gold zari temple border...",   // English
  "desc_ta": "தங்க ஜரி கோயில் கரை...",         // Tamil
  "price": "₹45,500",
  "silk": "Kanjivaram",
  "zari": "Pure Gold",
  "weave": "Temple Border",
  "occasion": "Muhurtham",
  "images": ["drape-front.webp", "drape-back.webp"],
  "video_clip": "drape-3s.mp4",               // 3-second hover video
  "weaver_story": "Handwoven by artisan...",   // English
  "weaver_story_ta": "கைவினைஞரால் நெய்..."     // Tamil
}
```
