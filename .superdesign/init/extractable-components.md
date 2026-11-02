# Extractable components

Reusable Superdesign DraftComponent candidates. Source of truth for implementation is `components.md` / `layouts.md`.

---

#### Layout Components (appear on most pages)

## Header
- Source: `src/components/Header/Header.tsx`
- Category: layout
- Description: Fixed glass navy header with logo, hash nav, and Telegram apply chip
- Extractable props: onHome (boolean, default: true), isScrolled (boolean, default: false)
- Hardcoded: logo PNG, “Axiom Studio” wordmark, nav labels (Партнёрство / Процесс / Проекты / Вопросы), “Заявка” label, Telegram icon, accent pill CTA, 76px height, blur 14px

## Footer
- Source: `src/components/Footer/Footer.tsx`
- Category: layout
- Description: Dark-deep footer with brand, section links, contacts, privacy, SEO materials
- Extractable props: year (number), onHome (boolean, default: true)
- Hardcoded: STUDIO_NAME, STUDIO_TAGLINE, nav titles (“Разделы”, “Контакты”), Telegram/email/channel labels, privacy title, copyright sentence, navy background

## AppShell
- Source: `src/App.tsx`
- Category: layout
- Description: Header + main + Footer + motion providers
- Extractable props: path (string, default: "/")
- Hardcoded: MotionConfig, LazyMotion, YandexMetrika mount

## LandingBreadcrumbs
- Source: `src/components/Landing/LandingPage.tsx` (crumbs block)
- Category: layout
- Description: Главная / current article label
- Extractable props: currentLabel (string), homeHref (string, default: "/")
- Hardcoded: “Главная”, slash separator, crumb styles

---

#### Basic Components (used across pages)

## Button
- Source: `src/components/ui/Button/Button.tsx`
- Category: basic
- Description: Pill CTA, button or link, three variants
- Extractable props: variant (string, default: "primary"), size (string, default: "md"), href (string), children (node)
- Hardcoded: pill radius, Manrope 600, sheen gradient on primary, accent greens, 44/52 min-heights

## ApplyButton
- Source: `src/components/ui/ApplyButton/ApplyButton.tsx`
- Category: basic
- Description: Apply CTA to Telegram mini-app with source tracking
- Extractable props: source (string), children (node), size (string, default: "lg"), variant (string, default: "primary")
- Hardcoded: PaperPlaneTilt icon, Telegram apply URL builder, Metrika goal names

## ManagerButton
- Source: `src/components/ui/ManagerButton/ManagerButton.tsx`
- Category: basic
- Description: Secondary “Связаться с менеджером” Telegram chat CTA
- Extractable props: size (string, default: "lg"), variant (string, default: "secondary")
- Hardcoded: MANAGER_LABEL, ChatCircleText icon, TELEGRAM_URL

## Container
- Source: `src/components/ui/Container/Container.tsx`
- Category: basic
- Description: 1280px max-width padded wrapper
- Extractable props: as (string, default: "div")
- Hardcoded: `.container` class, gutters, safe-area padding

## Magnetic
- Source: `src/components/ui/Magnetic/Magnetic.tsx`
- Category: basic
- Description: Mouse-only magnetic pull around a child CTA
- Extractable props: none required
- Hardcoded: spring stiffness/damping, ±12/±8 px clamp

## SocialLinks
- Source: `src/components/ui/SocialLinks/SocialLinks.tsx`
- Category: basic
- Description: Social row with Telegram icon (optional framed chip)
- Extractable props: size (string, default: "md"), framed (boolean, default: false)
- Hardcoded: “Мы в соц сетях”, Telegram logo, accent circle

## Hero
- Source: `src/components/Hero/Hero.tsx`
- Category: basic
- Description: Full-bleed dark hero with word-stagger title, dual CTAs, facts, partnership split card
- Extractable props: none required (copy from `src/data/hero.ts`)
- Hardcoded: glow/orb/grid/noise layers, HERO title/description/CTAs/facts, HERO_VISUAL card copy, Handshake badge

## ContactCTA
- Source: `src/components/ContactCTA/ContactCTA.tsx`
- Category: basic
- Description: Dark final CTA panel with apply + manager buttons
- Extractable props: none required (copy from `src/data/cta.ts`)
- Hardcoded: glow, FINAL_CTA title/description/button, APPLY_HINT

## FaqAccordion
- Source: `src/components/Faq/Faq.tsx`
- Category: basic
- Description: Multi-open FAQ list with JSON-LD
- Extractable props: openIds (string[])
- Hardcoded: FAQ_TITLE, FAQ_ITEMS copy, accordion chrome

## PartnershipCards
- Source: `src/components/Partnership/Partnership.tsx`
- Category: basic
- Description: Icon + title + description card grid
- Extractable props: none required
- Hardcoded: PARTNERSHIP copy, Phosphor duotone icons, card surface styles

## BrandLogo
- Source: `src/components/Header/Header.tsx` (logo block) + `src/assets/axiom-logo.png`
- Category: basic
- Description: Axiom mark + wordmark used in the header
- Extractable props: href (string, default: "/"), showWordmark (boolean, default: true on laptop)
- Hardcoded: PNG asset, 32px image height, “Axiom Studio” text
