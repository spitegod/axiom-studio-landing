# Shared layouts

The app is a single SPA shell in `src/App.tsx`. Every route renders the same chrome: fixed `Header`, `<main>` (home / privacy / SEO landing), `Footer`, and optional `YandexMetrika`. There is no React Router, no sidebar, no app bar besides Header.

Motion wrapper: `MotionConfig reducedMotion="user"` + `LazyMotion features={domAnimation}`.

---

## App shell

- Path: `src/App.tsx`
- Description: Path switcher. `/privacy` → Privacy; known landing paths → `LandingPage`; else home section stack.

```tsx
import { LazyMotion, MotionConfig, domAnimation } from './motion';
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { Partnership } from './components/Partnership/Partnership';
import { Exchange } from './components/Exchange/Exchange';
import { Process } from './components/Process/Process';
import { FounderFit } from './components/FounderFit/FounderFit';
import { Projects } from './components/Projects/Projects';
import { Faq } from './components/Faq/Faq';
import { ContactCTA } from './components/ContactCTA/ContactCTA';
import { Footer } from './components/Footer/Footer';
import { Privacy } from './components/Privacy/Privacy';
import { LandingPage } from './components/Landing/LandingPage';
import { YandexMetrika } from './components/Analytics/YandexMetrika';
import { useScrollReveal } from './hooks/useScrollReveal';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { usePageMeta } from './hooks/usePageMeta';
import { getLanding } from './data/landings';
import { PRIVACY_PATH } from './data/privacy';
import { currentPath } from './router/path';
import { metaForPath } from './seo/site';

function Home() {
  return (
    <>
      <Hero />
      <Partnership />
      <Exchange />
      <Process />
      <FounderFit />
      <Projects />
      <Faq />
      <ContactCTA />
    </>
  );
}

function App() {
  useSmoothScroll();
  useScrollReveal();
  const path = currentPath();
  const landing = getLanding(path);
  usePageMeta(metaForPath(path));

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        <Header />
        <main>
          {path === PRIVACY_PATH ? (
            <Privacy />
          ) : landing ? (
            <LandingPage page={landing} />
          ) : (
            <Home />
          )}
        </main>
        <Footer />
        <YandexMetrika />
      </LazyMotion>
    </MotionConfig>
  );
}

export default App;
```

---

## Header / top nav

- Path: `src/components/Header/Header.tsx`
- Styles: `src/components/Header/Header.module.scss`
- Description: Fixed 76px glass header on `--color-dark-deep`. Logo (`src/assets/axiom-logo.png` + “Axiom Studio” from laptop breakpoint), horizontally scrollable hash nav (`NAV_ITEMS`), and a compact Telegram apply CTA. Transparent-ish on home until scroll; always “scrolled” (darker) on inner pages.

```tsx
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { TelegramLogo } from '@phosphor-icons/react';
import { NAV_ITEMS } from '../../data/content';
import { reachGoal, METRIKA_GOALS } from '../../data/analytics';
import { applyLink, STUDIO_NAME } from '../../data/contacts';
import { currentPath } from '../../router/path';
import { scrollToSection } from '../../utils/scrollToSection';
import logoImage from '../../assets/axiom-logo.png';
import styles from './Header.module.scss';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const onHome = currentPath() === '/';
  const [isNavScrollable, setIsNavScrollable] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const checkOverflow = () => {
      setIsNavScrollable(nav.scrollWidth > nav.clientWidth + 1);
    };

    checkOverflow();

    const resizeObserver = new ResizeObserver(checkOverflow);
    resizeObserver.observe(nav);
    window.addEventListener('resize', checkOverflow);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', checkOverflow);
    };
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled || !onHome ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <a
          href={onHome ? '#top' : '/'}
          className={styles.logo}
          aria-label={STUDIO_NAME}
          onClick={
            onHome
              ? (event) => {
                  event.preventDefault();
                  scrollToSection('#top');
                }
              : undefined
          }
        >
          <img src={logoImage} alt="" className={styles.logoImage} aria-hidden="true" />
          <span className={styles.logoText} aria-hidden="true">
            {STUDIO_NAME}
          </span>
        </a>

        <nav
          ref={navRef}
          className={`${styles.nav} ${isNavScrollable ? styles.navScrollable : ''}`}
          aria-label="Основная навигация"
        >
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={onHome ? item.href : `/${item.href}`}
                  onClick={
                    onHome
                      ? (event) => {
                          event.preventDefault();
                          scrollToSection(item.href);
                        }
                      : undefined
                  }
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <a
            href={applyLink('header')}
            className={styles.navCta}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Подать заявку"
            onClick={() => reachGoal(METRIKA_GOALS.applyHeader)}
          >
            <TelegramLogo size={18} weight="fill" aria-hidden="true" />
            <span className={styles.navCtaLabel}>Заявка</span>
          </a>
        </div>
      </div>
    </header>
  );
}
```

```scss
@use '../../styles/mixins';

.header {
  position: fixed;
  inset-inline: 0;
  top: 0;
  z-index: 100;
  height: var(--header-height);
  display: flex;
  align-items: center;
  background: rgba(0, 35, 47, 0.36);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid transparent;
  transition:
    background-color var(--duration-base) var(--ease-standard),
    border-color var(--duration-base) var(--ease-standard);
  padding-top: env(safe-area-inset-top);
  animation: header-in 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes header-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.header.scrolled {
  background: rgba(0, 35, 47, 0.82);
  border-bottom-color: var(--color-hairline-dark);
}

.inner {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  width: 100%;

  @include mixins.from-laptop {
    gap: var(--space-xl);
  }
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  flex-shrink: 0;

  @include mixins.focus-ring;
}

.logoImage {
  display: block;
  height: 32px;
  width: auto;
}

.logoText {
  display: none;
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: -0.2px;
  color: var(--color-on-dark);

  @include mixins.from-laptop {
    display: inline;
  }
}

.nav {
  display: flex;
  justify-content: center;
  min-width: 0;
  flex: 1 1 auto;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  &.navScrollable {
    justify-content: flex-start;
    mask-image: linear-gradient(to right, black calc(100% - 28px), transparent 100%);
    -webkit-mask-image: linear-gradient(to right, black calc(100% - 28px), transparent 100%);

    ul {
      padding-right: var(--space-lg);
    }
  }

  ul {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    width: max-content;

    @include mixins.from-laptop {
      gap: var(--space-xxl);
    }
  }

  a {
    display: inline-block;
    font-size: var(--fs-body-sm);
    font-weight: 500;
    color: var(--color-on-dark-muted);
    padding: var(--space-xs) 0;
    white-space: nowrap;
    position: relative;
    transition: color var(--duration-base) var(--ease-standard);

    @include mixins.focus-ring;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      right: 100%;
      bottom: 0;
      height: 2px;
      background: var(--color-accent);
      transition: right var(--duration-base) var(--ease-standard);
    }

    &:hover {
      color: var(--color-on-dark);

      &::after {
        right: 0;
      }
    }
  }
}

.actions {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.navCta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  background: var(--color-accent);
  color: var(--color-on-accent);
  white-space: nowrap;
  border-radius: var(--radius-full);
  transition:
    background-color var(--duration-base) var(--ease-standard),
    box-shadow var(--duration-base) var(--ease-standard),
    transform var(--duration-fast) var(--ease-standard);

  @include mixins.focus-ring;

  &:hover {
    background: var(--color-accent-deep);
    box-shadow: 0 0 0 4px rgba(0, 237, 100, 0.22);
  }

  &:active {
    transform: scale(0.96);
  }

  @include mixins.from-laptop {
    width: auto;
    height: auto;
    gap: var(--space-xs);
    padding: 8px var(--space-lg);
  }
}

.navCtaLabel {
  display: none;
  font-size: var(--fs-body-sm);
  font-weight: 600;

  @include mixins.from-laptop {
    display: inline;
  }
}

@include mixins.reduced-motion {
  .header {
    animation: none;
  }
}
```

Nav labels (from `src/data/content.ts`): Партнёрство `#partnership`, Процесс `#process`, Проекты `#projects`, Вопросы `#faq`.

---

## Footer

- Path: `src/components/Footer/Footer.tsx`
- Styles: `src/components/Footer/Footer.module.scss`
- Description: Dark-deep footer with brand + tagline, section anchors, contacts (Telegram, email, channel), copyright + privacy link, and SEO landing “materials” links.

```tsx
import { PaperPlaneTilt } from '@phosphor-icons/react';
import { Container } from '../ui';
import { NAV_ITEMS } from '../../data/content';
import {
  CHANNEL_URL,
  STUDIO_EMAIL,
  STUDIO_NAME,
  STUDIO_TAGLINE,
  TELEGRAM_URL,
  TELEGRAM_USERNAME,
} from '../../data/contacts';
import { LANDINGS } from '../../data/landings';
import { PRIVACY_PATH, PRIVACY_TITLE } from '../../data/privacy';
import { currentPath } from '../../router/path';
import { scrollToSection } from '../../utils/scrollToSection';
import styles from './Footer.module.scss';

export function Footer() {
  const year = new Date().getFullYear();
  const onHome = currentPath() === '/';

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.logo}>{STUDIO_NAME}</span>
            <p className={styles.description}>{STUDIO_TAGLINE}</p>
          </div>

          <nav className={styles.nav} aria-label="Навигация по разделам">
            <span className={styles.navTitle}>Разделы</span>
            <ul>
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={onHome ? item.href : `/${item.href}`}
                    onClick={
                      onHome
                        ? (event) => {
                            event.preventDefault();
                            scrollToSection(item.href);
                          }
                        : undefined
                    }
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.contacts}>
            <span className={styles.navTitle}>Контакты</span>
            <a
              className={styles.contactLink}
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <PaperPlaneTilt size={16} weight="bold" aria-hidden="true" />
              @{TELEGRAM_USERNAME}
            </a>
            <a className={styles.contactLink} href={`mailto:${STUDIO_EMAIL}`}>
              {STUDIO_EMAIL}
            </a>
            {CHANNEL_URL && (
              <a
                className={styles.contactLink}
                href={CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Канал в Telegram
              </a>
            )}
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            © {year} {STUDIO_NAME}. Все права защищены.
          </p>
          <a href={PRIVACY_PATH}>{PRIVACY_TITLE}</a>
        </div>

        <nav className={styles.materials} aria-label="Материалы">
          {LANDINGS.map((page) => (
            <a key={page.path} href={page.path}>
              {page.footerLabel}
            </a>
          ))}
        </nav>
      </Container>
    </footer>
  );
}
```

```scss
@use '../../styles/mixins';

.footer {
  background: var(--color-dark-deep);
  color: var(--color-on-dark);
  padding-top: var(--space-section);
  padding-bottom: max(var(--space-xl), env(safe-area-inset-bottom));
}

.top {
  display: flex;
  flex-direction: column;
  gap: var(--space-xxl);
  padding-bottom: var(--space-xxl);
  border-bottom: 1px solid var(--color-hairline-dark);

  @include mixins.from-tablet {
    flex-direction: row;
    justify-content: space-between;
  }
}

.brand {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  max-width: 360px;
}

.logo {
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: -0.2px;
}

.description {
  font-size: var(--fs-body-sm);
  line-height: 1.55;
  color: var(--color-on-dark-muted);
}

.navTitle {
  display: block;
  font-size: var(--fs-caption);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-on-dark-muted);
  margin-bottom: var(--space-md);
}

.nav ul {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.nav a {
  font-size: var(--fs-body-sm);
  color: var(--color-on-dark);
  transition: color var(--duration-base) var(--ease-standard);

  &:hover {
    color: var(--color-accent);
  }
}

.contacts {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.contactLink {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: var(--fs-body-sm);
  color: var(--color-on-dark);
  transition: color var(--duration-base) var(--ease-standard);

  &:hover {
    color: var(--color-accent);
  }
}

.bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--space-sm) var(--space-lg);
  padding-top: var(--space-xl);
  font-size: var(--fs-caption);
  color: var(--color-on-dark-muted);

  a {
    color: var(--color-on-dark-muted);
    text-decoration: underline;
    text-underline-offset: 3px;

    &:hover {
      color: var(--color-accent);
    }
  }
}

.materials {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs) var(--space-md);
  margin-top: var(--space-md);
}

.materials a {
  font-size: var(--fs-caption);
  color: var(--color-on-dark-muted);
  text-decoration: underline;
  text-underline-offset: 3px;

  &:hover {
    color: var(--color-accent);
  }
}
```

---

## Breadcrumb (landing pages only)

`LandingPage` renders an in-article crumb: `Главная / {footerLabel}`. Not a shared layout component.

---

## Client entry

- Path: `src/main.tsx` — hydrates or mounts `#root`, imports `src/styles/global.scss`.
- Path: `index.html` — `lang="ru"`, theme-color `#00232f`, Manrope 400–800, prerender `.reveal` visibility hack.
