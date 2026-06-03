# Casa del Sol — Web (Next.js)

Animated marketing + listings frontend for Casa del Sol Holidays, built with
**Next.js 16 (App Router) + TypeScript + Tailwind v4 + Framer Motion + Lenis**.
It consumes the existing **Django REST API** (deployed on Render) — the backend was
intentionally **not** migrated.

## Structure

```
app/
  page.tsx                 Animated landing (scroll-driven hero + services + featured + about)
  properties/              Properties explorer (list + Mapbox map + filters)
  apartments/[id]/         Property detail (gallery, map, JSON-LD SEO) — server-rendered
  cookie-policy/
components/
  landing/                 Hero, Services, FeaturedProperties, About
  properties/              PropertiesExplorer, PropertyMap
  property/                PropertyDetail, DetailMap
  motion/                  Reveal, Parallax primitives
  Navbar, Footer, CookieConsent, Analytics, PropertyCard, SmoothScroll
lib/
  api.ts                   Typed API client + mediaUrl() helper
  types.ts                 Property types
  consent.ts               Cookie-consent storage (GDPR)
public/hero/               Stitched villa walkthrough video (mp4 + poster)
```

## Environment variables

Copy `.env.example` → `.env.local` and fill in:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | Django API base, **must end in `/api/`** (e.g. `https://your-app.onrender.com/api/`) |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Mapbox public token (`pk.…`) for the maps |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID (loaded only after analytics consent) |

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (run before every deploy)
```

## Deploy to Vercel

1. Import this repo in Vercel and set **Root Directory = `web`**.
2. Add the three env vars above in **Project → Settings → Environment Variables**.
3. Deploy. (Framework auto-detected as Next.js.)

### Backend CORS (Django on Render)

`casadelsol/settings.py` already allows:
- `http://localhost:3000` (dev)
- `https://casadelsolholidays.es` + `www` (production custom domain)
- `https://*.vercel.app` (preview + Vercel-hosted prod) via `CORS_ALLOWED_ORIGIN_REGEXES`

When you point the **custom domain** at Vercel, it's already allowlisted. If you use a
different production domain, add it to `CORS_ALLOWED_ORIGINS` and `CSRF_TRUSTED_ORIGINS`
and redeploy the Django app on Render.

## Notes

- The legacy Vue app remains in `../frontend` until this is live; retire it afterward.
- Property images load directly from Django `/media/` (resolved by `mediaUrl()` against the API origin).
- Reduced-motion is respected throughout (smooth scroll + hero scroll-jacking disabled).
