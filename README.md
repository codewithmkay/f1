# APEX — Formula 1 Intelligence

An independent F1 race dashboard: live-feeling standings, a full season calendar,
driver profiles, telemetry-styled analytics charts and current paddock news —
built with React, TypeScript, Tailwind CSS, Framer Motion and Recharts.

APEX is not affiliated with Formula 1, the FIA, or any team.

## Design

The visual language is deliberately not the "red carbon-fiber" F1 template.
It's built around a broadcast-timing idea instead:

- **Palette** — near-black graphite surfaces, a violet "sector purple" as the
  primary accent (a nod to purple sector times on timing screens), a warm gold
  for live/CTA moments, and a cyan/pink/green set reserved for chart series.
- **Type** — `Big Shoulders Display` (condensed, heavy) for headlines, `Inter`
  for body copy, `IBM Plex Mono` for anything that reads like data (labels,
  timestamps, ticker text).
- **Signature element** — a looping telemetry ticker beneath the nav bar, and
  driver cards built around oversized car-number typography rather than stock
  headshots, so the grid still feels premium even before real photos load.

## Tech stack

- React 18 + TypeScript + Vite
- Tailwind CSS (custom design tokens in `tailwind.config.js`)
- Framer Motion for entrance/scroll/hover motion
- Recharts for the analytics charts
- lucide-react for icons

## Data sources

| Source | Used for | Auth |
|---|---|---|
| [Jolpica F1 API](https://api.jolpi.ca/ergast/f1) (Ergast-compatible) | Season calendar, driver & constructor standings, race results, points progression | None |
| [OpenF1 API](https://openf1.org) | Live/latest session status (the nav "session live" indicator) and real driver headshots | None |
| A news API (NewsAPI.org by default) | Latest paddock stories | Free API key |

All API calls live in `src/services/*` behind a small shared fetch wrapper
(`src/services/http.ts`) that handles timeouts and normalizes errors, so
components never call `fetch` directly. Every section has its own
loading / error / empty state (see `src/components/ui/States.tsx`).

## Getting started

```bash
npm install
cp .env.example .env
# add a free NewsAPI.org key to .env if you want the "Latest Stories" section to load
npm run dev
```

Then open the printed local URL. `npm run build` produces a production build
in `dist/`; `npm run preview` serves that build locally.

### Environment variables

See `.env.example`:

- `VITE_JOLPICA_BASE_URL` / `VITE_OPENF1_BASE_URL` — public, no key required;
  only change these if you're pointing at a self-hosted mirror.
- `VITE_NEWS_API_KEY` — get a free key at https://newsapi.org/register.
  **Note:** NewsAPI's free tier only allows requests from `localhost` — it
  will 426/CORS-reject calls from a deployed domain. For production, proxy
  the `/v2/everything` call through your own serverless function (Vercel/
  Netlify function, Cloudflare Worker, etc.) and point
  `VITE_NEWS_API_BASE_URL` at that proxy instead. The News section already
  renders a clear, non-crashing error state if the key is missing or the
  request is rejected.

## Project structure

```
src/
  components/       Page sections + shared UI primitives (components/ui)
  hooks/            Data-fetching hooks (one per concern), all built on useAsync
  services/         API clients — one per external data source
  types/f1.ts        Shared domain types used across the app
  utils/            Formatting, nationality/flag mapping, team color tokens
```

## Known limitations / next steps

- The "recent form" glyphs on driver standings are wired in the type model
  (`DriverStanding.form`) but Jolpica doesn't expose a simple per-race result
  feed for this without one request per round per driver — left as a
  follow-up rather than adding a heavy waterfall of requests.
- Driver headshots come from OpenF1's `drivers` endpoint when available for
  the latest session; between seasons or early in a season this can be
  empty, in which case the card falls back to the number/initials treatment
  by design (see `DriverSpotlight.tsx`).
- Circuit hero imagery per-race isn't included — the hero uses one strong,
  real photograph rather than per-circuit stock photography, to keep image
  quality consistent.

## Deployment

Any static host works (Vercel, Netlify, Cloudflare Pages, GitHub Pages):

```bash
npm run build
```

Deploy the `dist/` folder. Remember to set the environment variables in your
host's dashboard (not just locally in `.env`), and set up the NewsAPI proxy
mentioned above if you want live news in production.
