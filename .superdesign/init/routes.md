# Routes

No React Router. Path comes from `window.location.pathname` on the client and `setSsrPath` during prerender (`src/router/path.ts`). `App` switches on that path.

Layout for every URL: `Header` + `<main>` + `Footer`.

## Router helpers

- Path: `src/router/path.ts`

```ts
let ssrPath = '/';

export function setSsrPath(path: string) {
  ssrPath = normalizePath(path);
}

export function normalizePath(path: string): string {
  const trimmed = path.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

/** Путь без завершающего слэша. Корень остаётся «/». */
export function currentPath(): string {
  const raw = typeof window === 'undefined' ? ssrPath : window.location.pathname;
  return normalizePath(raw);
}

export function isPrivacyPath(): boolean {
  return currentPath() === '/privacy';
}
```

Prerender list: `PRERENDER_ROUTES` in `src/seo/site.ts` (home + privacy + each landing).

---

## URL map

| URL | Component | Layout | Summary |
| --- | --- | --- | --- |
| `/` | `Home` in `src/App.tsx` | App shell | Marketing home: hero, partnership, exchange, process, founder fit, projects, FAQ, final CTA. |
| `/privacy` | `src/components/Privacy/Privacy.tsx` | App shell | Legal privacy policy + consent text. Keep aligned with startup-for-equity repositioning; do not invent new operator facts. |
| `/razrabotka-startapa-za-dolyu` | `LandingPage` + `LANDINGS[0]` | App shell | SEO article: startup development for equity. |
| `/mvp-za-procent-ot-vyruchki` | `LandingPage` + `LANDINGS[1]` | App shell | SEO article: MVP for a revenue share. |
| `/razrabotka-telegram-mini-app` | `LandingPage` + `LANDINGS[2]` | App shell | SEO article: Telegram mini-app development. |
| `/tehnicheskiy-partner-dlya-startapa` | `LandingPage` + `LANDINGS[3]` | App shell | SEO article: technical partner for a startup. |
| `/kak-zapustit-startap-bez-deneg-na-razrabotku` | `LandingPage` + `LANDINGS[4]` | App shell | SEO article: launch without paying for development. |

Unknown paths fall through to `Home` (same as `/`).

Landing data: `src/data/landings.ts` (`getLanding(path)`). Privacy path constant: `PRIVACY_PATH = '/privacy'` in `src/data/privacy.ts`.

## Home sections (hash targets)

From `src/data/content.ts` `SECTION_IDS`:

- `#top` — Hero
- `#partnership` — Partnership
- `#exchange` — Exchange
- `#process` — Process
- `#fit` — FounderFit
- `#projects` — Projects
- `#faq` — Faq
- `#contact` — ContactCTA

Header/footer nav uses partnership, process, projects, faq only.

## Key page render notes

**Home** — dark full-bleed hero, then alternating light sections, dark final CTA, dark footer. Apply + manager CTAs in hero and CTA. Copy already positions the studio as building startups for equity / revenue share (not a paid agency). Future design drafts should keep that model; privacy page legal facts stay operator-aligned.

**Privacy** — light article sheet under the dark header, no CTA band.

**SEO landings** — shared `LandingPage`: crumbs, intro + CTAs, prose sections, FAQ, related links, dark CTA panel.
