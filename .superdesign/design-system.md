# Axiom Studio design system

## Product

Axiom Studio is a venture studio that builds a founder’s startup **for equity or a revenue share**, not as a paid agency. The founder brings market knowledge and energy; the studio takes product, development, launch, and first customers. Share size and plan are negotiated per partnership. Privacy/legal pages stay aligned with this model and must not invent new operator facts.

Primary audience: Russian-speaking founders who know a niche and want to launch without paying for development.

Primary page: `/` marketing home. Also `/privacy` and five SEO article landings that reuse the same chrome and CTAs.

## Key pages & architecture

- Shell: fixed glass header + `<main>` + dark footer. No sidebar.
- Home sections in order: Hero (`#top`) → Partnership (`#partnership`) → Exchange (`#exchange`) → Process (`#process`) → FounderFit (`#fit`) → Projects (`#projects`) → Faq (`#faq`) → ContactCTA (`#contact`).
- CTAs: primary “Подать заявку” opens Telegram mini-app; secondary “Связаться с менеджером” opens Telegram chat (`@mgr_axiom_studio`).

## Branding & styling (HARD CONSTRAINT)

Do **not** invent a new palette, fonts, or button language.

- Font: **Manrope** 400–800 only (system fallbacks allowed). No serif, no decorative display faces.
- Accent: `#00ed64` / hover `#00b545` / pressed `#008c34` / on-accent `#00232f`
- Dark surfaces: `#00232f` (deep), `#073a4a`, `#0d5a63`
- Light: canvas `#ffffff`, surface `#f8fafa` / `#f2f5f5`, feature wash `#e3fcef`
- Hairlines: `#e2e6e7`, `#c3ccce`, dark `#1f424f`
- Ink: `#00232f`; on-dark `#ffffff` / muted `#a9c1c5`
- Radii: 4–24px; CTAs are **pills** (`9999px`)
- Container: max 1280px, gutter 32px (24px mobile)
- Header: 76px, glass `rgba(0,35,47,0.36)` resting / `0.82` scrolled, blur 14px
- Focus: 2px solid accent, offset 3px
- Shadows: navy-tinted (see tokens). Primary hover glow `0 8px 28px rgba(0,237,100,0.35)`

Logo: Axiom mark PNG + wordmark “Axiom Studio” (wordmark hidden below laptop). Never replace the mark with initials, emoji, invented SVG, or text alone.

## Motion

Existing: Lenis smooth scroll; `.reveal` fade/slide 20px; hero word-stagger; magnetic pull on primary CTAs (mouse only, ±12/±8px); primary sheen sweep; header fade-in.

Requested exploration (variations only, after baseline): 2–3s first-open full-screen intro that then transitions into the homepage hero; richer hover/scroll/magnetic interactions. Respect `prefers-reduced-motion`. Intro uses the existing navy + accent only.

## Copy anchors (home)

- Hero title: «Строим ваш стартап за долю, а не за деньги»
- Hero body: founder brings market + energy; studio takes product, build, launch, first clients
- Facts: «Без оплаты за разработку» · «Доля или % от выручки» · «План согласуем вместе»
- Hero CTAs: «Подать заявку» · «Связаться с менеджером» · «Как устроено партнёрство»
- Final CTA: «Есть знание рынка? Давайте построим бизнес вместе»
- Nav: Партнёрство · Процесс · Проекты · Вопросы · Заявка
- Language: Russian throughout

## Components

- Button variants: primary (accent pill + sheen), secondary (ink hairline), secondary-on-dark (white hairline on navy)
- ApplyButton / ManagerButton wrap Button
- Header: logo + hash nav + compact Telegram apply chip
- Footer: brand + tagline, section links, contacts, privacy, SEO material links
- Hero visual: split card Основатель / Студия + note card + handshake badge
