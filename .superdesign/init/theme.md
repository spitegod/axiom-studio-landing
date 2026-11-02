# Theme tokens

No Tailwind. Tokens are CSS custom properties in `src/styles/_tokens.scss`, consumed by `src/styles/global.scss` and Sass modules. Mixins/breakpoints in `src/styles/_mixins.scss`. Font loaded in `index.html`: Google Fonts Manrope 400, 500, 600, 700, 800.

There is no `.dark` class theme. Dark surfaces are explicit tokens used on hero, header, CTA, footer.

---

## Part 1 — Compact token summary

### Color

| Token | Value | Use |
| --- | --- | --- |
| `--color-accent` | `#00ed64` | Primary CTA, links hover, focus, logo mark |
| `--color-accent-deep` | `#00b545` | CTA hover |
| `--color-accent-pressed` | `#008c34` | CTA active |
| `--color-accent-soft` | `#c3f0d2` | Soft accent wash |
| `--color-on-accent` | `#00232f` | Text/icons on accent |
| `--color-dark-deep` | `#00232f` | Footer, deepest navy, theme-color |
| `--color-dark` | `#073a4a` | Mid navy |
| `--color-dark-mid` | `#0d5a63` | Teal-navy |
| `--color-canvas` | `#ffffff` | Page background |
| `--color-surface` | `#f8fafa` | Light panels |
| `--color-surface-soft` | `#f2f5f5` | Softer panels |
| `--color-surface-feature` | `#e3fcef` | Feature/mint wash |
| `--color-hairline` | `#e2e6e7` | Light borders |
| `--color-hairline-soft` | `#edf0f0` | Softer borders |
| `--color-hairline-strong` | `#c3ccce` | Secondary button border |
| `--color-hairline-dark` | `#1f424f` | Borders on dark |
| `--color-ink` | `#00232f` | Primary text |
| `--color-charcoal` | `#1c3138` | Strong body |
| `--color-slate` | `#3d4f53` | Secondary text |
| `--color-steel` | `#5c6e72` | Tertiary |
| `--color-stone` | `#7c8b8e` | Quiet text |
| `--color-muted` | `#a8b4b6` | Muted |
| `--color-on-dark` | `#ffffff` | Text on dark |
| `--color-on-dark-muted` | `#a9c1c5` | Muted on dark |

Header glass: `rgba(0, 35, 47, 0.36)` resting, `rgba(0, 35, 47, 0.82)` scrolled.

### Typography

- `--font-primary`: `'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- `--font-mono`: `'JetBrains Mono', 'SF Mono', Menlo, Consolas, monospace`
- Body: `--fs-body-md` 1rem / line-height 1.55, weight 400–800
- `--fs-hero-display`: `clamp(2.25rem, 1.5rem + 3.2vw, 4.5rem)`
- `--fs-display-lg`: `clamp(2rem, 1.4rem + 2.4vw, 3.5rem)`
- `--fs-heading-1`: `clamp(1.75rem, 1.3rem + 1.8vw, 3rem)`
- `--fs-heading-2`: `clamp(1.5rem, 1.2rem + 1.2vw, 2.25rem)`
- `--fs-heading-3`: `clamp(1.25rem, 1.05rem + 0.8vw, 1.75rem)`
- `--fs-heading-4`: 1.375rem
- `--fs-heading-5`: 1.125rem
- `--fs-subtitle`: 1.125rem
- `--fs-body-sm`: 0.875rem
- `--fs-caption`: 0.8125rem
- `--fs-micro`: 0.75rem
- `--fs-micro-uppercase`: 0.6875rem
- `--fs-button`: 0.875rem (buttons weight 600)
- `--fs-code`: 0.875rem

### Spacing

`4 / 8 / 12 / 16 / 20 / 24 / 32 / 40` → `--space-xxs` … `--space-xxxl`

Section rhythm (desktop / ≤1023 / ≤767):

- `--space-section-sm`: 48 / 40 / 32
- `--space-section`: 64 / 48 / 40
- `--space-section-lg`: 96 / 72 / 56
- `--space-hero`: 120 / 88 / 64

`--container-max`: 1280px · `--container-gutter`: 32px (mobile uses `max(24px, safe-area)`)

### Radius

`4 / 6 / 8 / 12 / 16 / 24 / 9999` → `--radius-xs` … `--radius-full`. CTAs and header apply chip are pill (`--radius-full`).

### Shadows

- `--shadow-1`: `0 1px 2px 0 rgba(0, 35, 47, 0.04)`
- `--shadow-2`: `0 4px 12px 0 rgba(0, 35, 47, 0.08)`
- `--shadow-3`: `0 12px 24px -4px rgba(0, 35, 47, 0.12)`
- `--shadow-4`: `0 16px 48px -8px rgba(0, 35, 47, 0.16)`
- Primary hover: `0 8px 28px rgba(0, 237, 100, 0.35)`

### Motion / chrome

- `--header-height`: 76px
- `--ease-standard`: `cubic-bezier(0.4, 0, 0.2, 1)`
- Reveal ease: `cubic-bezier(0.22, 1, 0.36, 1)`
- `--duration-fast` 150ms · `--duration-base` 220ms · `--duration-slow` 420ms
- `.reveal`: opacity 0 + translateY(20px) → `.is-visible`

### Breakpoints (Sass mixins)

- tablet: 768px
- laptop: 1024px
- desktop: 1280px

---

## Part 2 — Raw source dumps

### `src/styles/_tokens.scss`

```scss
:root {
  --color-accent: #00ed64;
  --color-accent-deep: #00b545;
  --color-accent-pressed: #008c34;
  --color-accent-soft: #c3f0d2;
  --color-on-accent: #00232f;

  --color-dark-deep: #00232f;
  --color-dark: #073a4a;
  --color-dark-mid: #0d5a63;

  --color-canvas: #ffffff;
  --color-surface: #f8fafa;
  --color-surface-soft: #f2f5f5;
  --color-surface-feature: #e3fcef;

  --color-hairline: #e2e6e7;
  --color-hairline-soft: #edf0f0;
  --color-hairline-strong: #c3ccce;
  --color-hairline-dark: #1f424f;

  --color-ink: #00232f;
  --color-charcoal: #1c3138;
  --color-slate: #3d4f53;
  --color-steel: #5c6e72;
  --color-stone: #7c8b8e;
  --color-muted: #a8b4b6;
  --color-on-dark: #ffffff;
  --color-on-dark-muted: #a9c1c5;

  --font-primary: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', 'SF Mono', Menlo, Consolas, monospace;

  --fs-hero-display: clamp(2.25rem, 1.5rem + 3.2vw, 4.5rem);
  --fs-display-lg: clamp(2rem, 1.4rem + 2.4vw, 3.5rem);
  --fs-heading-1: clamp(1.75rem, 1.3rem + 1.8vw, 3rem);
  --fs-heading-2: clamp(1.5rem, 1.2rem + 1.2vw, 2.25rem);
  --fs-heading-3: clamp(1.25rem, 1.05rem + 0.8vw, 1.75rem);
  --fs-heading-4: 1.375rem;
  --fs-heading-5: 1.125rem;
  --fs-subtitle: 1.125rem;
  --fs-body-md: 1rem;
  --fs-body-sm: 0.875rem;
  --fs-caption: 0.8125rem;
  --fs-micro: 0.75rem;
  --fs-micro-uppercase: 0.6875rem;
  --fs-button: 0.875rem;
  --fs-code: 0.875rem;

  --radius-xs: 4px;
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-xxl: 24px;
  --radius-full: 9999px;

  --space-xxs: 4px;
  --space-xs: 8px;
  --space-sm: 12px;
  --space-md: 16px;
  --space-lg: 20px;
  --space-xl: 24px;
  --space-xxl: 32px;
  --space-xxxl: 40px;
  --space-section-sm: 48px;
  --space-section: 64px;
  --space-section-lg: 96px;
  --space-hero: 120px;

  --container-max: 1280px;
  --container-gutter: 32px;

  --shadow-1: 0 1px 2px 0 rgba(0, 35, 47, 0.04);
  --shadow-2: 0 4px 12px 0 rgba(0, 35, 47, 0.08);
  --shadow-3: 0 12px 24px -4px rgba(0, 35, 47, 0.12);
  --shadow-4: 0 16px 48px -8px rgba(0, 35, 47, 0.16);

  --header-height: 76px;
  --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
  --duration-fast: 150ms;
  --duration-base: 220ms;
  --duration-slow: 420ms;
}

@media (max-width: 1023px) {
  :root {
    --space-section-sm: 40px;
    --space-section: 48px;
    --space-section-lg: 72px;
    --space-hero: 88px;
  }
}

@media (max-width: 767px) {
  :root {
    --space-section-sm: 32px;
    --space-section: 40px;
    --space-section-lg: 56px;
    --space-hero: 64px;
  }
}
```

### `src/styles/_mixins.scss`

```scss
@mixin from-tablet {
  @media (min-width: 768px) {
    @content;
  }
}

@mixin from-laptop {
  @media (min-width: 1024px) {
    @content;
  }
}

@mixin from-desktop {
  @media (min-width: 1280px) {
    @content;
  }
}

@mixin until-tablet {
  @media (max-width: 767px) {
    @content;
  }
}

@mixin until-laptop {
  @media (max-width: 1023px) {
    @content;
  }
}

@mixin reduced-motion {
  @media (prefers-reduced-motion: reduce) {
    @content;
  }
}

@mixin focus-ring {
  &:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 3px;
    border-radius: var(--radius-xs);
  }
}

@mixin visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

### `src/styles/global.scss`

```scss
@use 'tokens';
@use 'mixins';

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
  scroll-behavior: smooth;
}

html.has-smooth-scroll {
  scroll-behavior: auto;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}

body {
  margin: 0;
  min-width: 320px;
  background: var(--color-canvas);
  color: var(--color-ink);
  font-family: var(--font-primary);
  font-size: var(--fs-body-md);
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

#root {
  overflow-x: hidden;
}

img,
svg {
  display: block;
  max-width: 100%;
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin: 0;
}

ul,
ol {
  margin: 0;
  padding: 0;
  list-style: none;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  font-family: inherit;
  cursor: pointer;
}

button,
input,
textarea {
  color: inherit;
}

:focus:not(:focus-visible) {
  outline: none;
}

:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
}

section[id] {
  scroll-margin-top: var(--header-height);
}

.container {
  width: 100%;
  max-width: var(--container-max);
  margin-inline: auto;
  padding-inline: max(var(--space-xl), env(safe-area-inset-left));
  padding-inline-end: max(var(--space-xl), env(safe-area-inset-right));

  @include mixins.from-tablet {
    padding-inline: var(--container-gutter);
  }
}

.visually-hidden {
  @include mixins.visually-hidden;
}

.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}

.reveal-stagger > .reveal:nth-child(2) {
  transition-delay: 0.08s;
}

.reveal-stagger > .reveal:nth-child(3) {
  transition-delay: 0.16s;
}

.reveal-stagger > .reveal:nth-child(4) {
  transition-delay: 0.24s;
}

.reveal-stagger > .reveal:nth-child(5) {
  transition-delay: 0.32s;
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.reveal.reveal--instant {
  transition: none;
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

No `tailwind.config.*`. Vite config (`vite.config.ts`) is React plugin only — no theme extend.
