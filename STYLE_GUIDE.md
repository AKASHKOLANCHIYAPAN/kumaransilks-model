# Kumaran Silks & Sarees — UI Style Guide

## Brand Colors

| Token | Name | Hex | Usage |
|-------|------|-----|-------|
| `--temple-gold` | Temple Gold | `#D4AF37` | Primary accent, CTAs, headings, borders |
| `--temple-gold-light` | Gold Light | `#E8CC6E` | Hover states, highlights |
| `--temple-gold-dark` | Gold Dark | `#B8961F` | Text on light backgrounds |
| `--maroon` | Kanchipuram Maroon | `#800000` | Secondary brand color, overlays, price text |
| `--maroon-light` | Maroon Light | `#A52A2A` | Hover, active states |
| `--emerald` | Emerald Silk | `#046307` | Accent for success, nature elements |
| `--ivory` | Ivory | `#FFFDF5` | Primary background |
| `--charcoal` | Charcoal | `#1A1A1A` | Text, dark sections, header/footer |

## Typography

| Role | Font Family | Weight | Size |
|------|-------------|--------|------|
| Headings (English) | **Playfair Display** | 600–700 | `clamp(2.5rem, 5vw, 4.5rem)` for hero, `2.25rem` for sections |
| Body (English) | **Poppins** | 300–500 | `1rem` base, `0.875rem` small |
| Tamil Text | **Noto Sans Tamil** | 300–700 | Same scale as English |
| Tags / Labels | Poppins | 500–600 | `0.75rem`, uppercase, letter-spacing `1–2px` |

## Button Styles

### Primary CTA (Gold Gradient)
```css
padding: 16px 40px;
background: linear-gradient(135deg, #D4AF37, #F2D06B, #D4AF37);
color: #1A1A1A;
border-radius: 9999px;
font-weight: 600;
letter-spacing: 2px;
text-transform: uppercase;
box-shadow: 0 4px 20px rgba(212, 175, 55, 0.3);
```

### Secondary (Outline)
```css
padding: 6px 16px;
border: 1px solid rgba(212, 175, 55, 0.4);
border-radius: 9999px;
color: #D4AF37;
background: transparent;
```

### Action Button (Dark Glass)
```css
padding: 10px 20px;
background: rgba(26, 26, 26, 0.9);
color: #fff;
border-radius: 9999px;
backdrop-filter: blur(10px);
```

## Spacing Scale

| Token | Value |
|-------|-------|
| `--space-xs` | `0.25rem` |
| `--space-sm` | `0.5rem` |
| `--space-md` | `1rem` |
| `--space-lg` | `1.5rem` |
| `--space-xl` | `2rem` |
| `--space-2xl` | `3rem` |
| `--space-section` | `clamp(4rem, 8vw, 8rem)` |

## Shadows

| Name | Value |
|------|-------|
| Card | `0 2px 10px rgba(0,0,0,0.06)` |
| Medium | `0 4px 12px rgba(0,0,0,0.1)` |
| Gold Glow | `0 4px 20px rgba(212,175,55,0.3)` |
| Elevated | `0 16px 50px rgba(0,0,0,0.16)` |

## Animations

| Effect | Duration | Easing |
|--------|----------|--------|
| Hover transitions | `200ms` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| Menu open/close | `350ms` | Same |
| Hero crossfade | `1500ms` | Same |
| Ken Burns (hero images) | `20s` | `ease-in-out` |
| Scroll reveal | `800ms` | Same, staggered per element |
| Silk shimmer (product hover) | `3s` | infinite |

## Decorative Elements

- **Ornament Divider**: Gold gradient lines with a 45° rotated gold diamond
- **Heritage Pattern**: SVG cross pattern at 4% opacity on dark backgrounds
- **Scroll Indicator**: Vertical text with pulsing gold line
