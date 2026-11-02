# Page dependency trees

Candidate `--context-file` sets. Apply PAYLOAD BUDGET before passing everything. Always prefer `theme.md` over dumping all SCSS.

App chrome (Header + Footer + tokens) is shared by every page.

---

## / (Home)

Entry: `src/App.tsx` (`Home`)  
Renders: Hero → Partnership → Exchange → Process → FounderFit → Projects → Faq → ContactCTA  
Layout: Header + Footer

Dependencies:
- `src/App.tsx`
  - `src/motion/index.ts`
  - `src/hooks/useSmoothScroll.ts`
  - `src/hooks/useScrollReveal.ts`
  - `src/hooks/usePageMeta.ts`
  - `src/router/path.ts`
  - `src/seo/site.ts`
    - `src/data/landings.ts`
    - `src/data/contacts.ts`
    - `src/data/privacy.ts`
  - `src/components/Header/Header.tsx`
    - `src/components/Header/Header.module.scss`
    - `src/data/content.ts`
    - `src/data/analytics.ts`
    - `src/data/contacts.ts`
    - `src/router/path.ts`
    - `src/utils/scrollToSection.ts`
    - `src/assets/axiom-logo.png`
  - `src/components/Hero/Hero.tsx`
    - `src/components/Hero/Hero.module.scss`
    - `src/motion/index.ts`
    - `src/motion/ease.ts`
    - `src/components/ui/ApplyButton/ApplyButton.tsx`
      - `src/components/ui/Button/Button.tsx`
        - `src/components/ui/Button/Button.module.scss`
      - `src/data/analytics.ts`
      - `src/data/contacts.ts`
    - `src/components/ui/Button/Button.tsx`
    - `src/components/ui/Container/Container.tsx`
    - `src/components/ui/Magnetic/Magnetic.tsx`
      - `src/motion/index.ts`
    - `src/components/ui/ManagerButton/ManagerButton.tsx`
      - `src/components/ui/Button/Button.tsx`
      - `src/data/analytics.ts`
      - `src/data/contacts.ts`
    - `src/data/content.ts`
    - `src/data/hero.ts`
    - `src/utils/scrollToSection.ts`
  - `src/components/Partnership/Partnership.tsx`
    - `src/components/Partnership/Partnership.module.scss`
    - `src/components/ui/Container/Container.tsx`
    - `src/data/partnership.ts`
    - `src/data/content.ts`
  - `src/components/Exchange/Exchange.tsx`
    - `src/components/Exchange/Exchange.module.scss`
    - `src/components/ui/Container/Container.tsx`
    - `src/data/exchange.ts`
    - `src/data/content.ts`
  - `src/components/Process/Process.tsx`
    - `src/components/Process/Process.module.scss`
    - `src/motion/index.ts`
    - `src/components/ui/Container/Container.tsx`
    - `src/data/process.ts`
    - `src/data/content.ts`
  - `src/components/FounderFit/FounderFit.tsx`
    - `src/components/FounderFit/FounderFit.module.scss`
    - `src/components/ui/Container/Container.tsx`
    - `src/data/founderFit.ts`
    - `src/data/content.ts`
  - `src/components/Projects/Projects.tsx`
    - `src/components/Projects/Projects.module.scss`
    - `src/motion/index.ts`
    - `src/components/ui/Container/Container.tsx`
    - `src/data/projects.ts`
    - `src/data/content.ts`
  - `src/components/Faq/Faq.tsx`
    - `src/components/Faq/Faq.module.scss`
    - `src/components/ui/Container/Container.tsx`
    - `src/data/faq.ts`
    - `src/data/content.ts`
  - `src/components/ContactCTA/ContactCTA.tsx`
    - `src/components/ContactCTA/ContactCTA.module.scss`
    - `src/components/ui/ApplyButton/ApplyButton.tsx`
    - `src/components/ui/Container/Container.tsx`
    - `src/components/ui/Magnetic/Magnetic.tsx`
    - `src/components/ui/ManagerButton/ManagerButton.tsx`
    - `src/data/content.ts`
    - `src/data/cta.ts`
    - `src/data/contacts.ts`
  - `src/components/Footer/Footer.tsx`
    - `src/components/Footer/Footer.module.scss`
    - `src/components/ui/Container/Container.tsx`
    - `src/data/content.ts`
    - `src/data/contacts.ts`
    - `src/data/landings.ts`
    - `src/data/privacy.ts`
    - `src/router/path.ts`
    - `src/utils/scrollToSection.ts`
  - `src/components/Analytics/YandexMetrika.tsx`
    - `src/data/analytics.ts`
- `src/styles/global.scss`
  - `src/styles/_tokens.scss`
  - `src/styles/_mixins.scss`

---

## /privacy

Entry: `src/components/Privacy/Privacy.tsx`  
Layout: Header + Footer (same as home)

Dependencies:
- `src/App.tsx` (path branch)
- `src/components/Privacy/Privacy.tsx`
  - `src/components/Privacy/Privacy.module.scss`
  - `src/components/ui/Container/Container.tsx`
  - `src/data/contacts.ts`
  - `src/data/privacy.ts`
- `src/components/Header/Header.tsx`
  - (same Header tree as home)
- `src/components/Footer/Footer.tsx`
  - (same Footer tree as home)
- `src/styles/global.scss`
  - `src/styles/_tokens.scss`
  - `src/styles/_mixins.scss`

Keep legal operator fields (name, INN, email, 152-FZ) aligned if home copy shifts to a clearer startup-for-equity story. Do not rewrite production privacy copy in the init/design-prep turn.

---

## SEO landings (shared template)

URLs:
- `/razrabotka-startapa-za-dolyu`
- `/mvp-za-procent-ot-vyruchki`
- `/razrabotka-telegram-mini-app`
- `/tehnicheskiy-partner-dlya-startapa`
- `/kak-zapustit-startap-bez-deneg-na-razrabotku`

Entry: `src/components/Landing/LandingPage.tsx`  
Data: `src/data/landings.ts` via `getLanding(path)`

Dependencies:
- `src/App.tsx` (path branch)
- `src/components/Landing/LandingPage.tsx`
  - `src/components/Landing/LandingPage.module.scss`
  - `src/components/Landing/RichText.tsx`
  - `src/components/ui/ApplyButton/ApplyButton.tsx`
    - `src/components/ui/Button/Button.tsx`
      - `src/components/ui/Button/Button.module.scss`
    - `src/data/analytics.ts`
    - `src/data/contacts.ts`
  - `src/components/ui/ManagerButton/ManagerButton.tsx`
  - `src/components/ui/Container/Container.tsx`
  - `src/data/landings.ts`
  - `src/data/contacts.ts`
  - `src/data/privacy.ts`
  - `src/seo/site.ts`
- `src/components/Header/Header.tsx`
- `src/components/Footer/Footer.tsx`
- `src/styles/global.scss`
  - `src/styles/_tokens.scss`
  - `src/styles/_mixins.scss`

---

## Design-priority note

Primary redesign target for the next Superdesign turn is `/` (home). Privacy stays legally aligned; SEO landings reuse the same apply/manager CTA language as home.
