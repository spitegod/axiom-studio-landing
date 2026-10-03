import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { TelegramLogo } from '@phosphor-icons/react';
import { NAV_ITEMS } from '../../data/content';
import { reachGoal, METRIKA_GOALS } from '../../data/analytics';
import { applyLink, STUDIO_NAME } from '../../data/contacts';
import { scrollToSection } from '../../utils/scrollToSection';
import logoImage from '../../assets/axiom-logo.png';
import styles from './Header.module.scss';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
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

    // Затухание у края и запасной отступ под него (см. .navScrollable в
    // стилях) нужны только когда список якорей реально не помещается —
    // иначе этот запасной отступ сам по себе делает список чуть шире
    // видимой области, и nav начинает скроллиться на пару пикселей там,
    // где скроллить уже нечего.
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
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <a
          href="#top"
          className={styles.logo}
          aria-label={STUDIO_NAME}
          onClick={(event) => {
            event.preventDefault();
            scrollToSection('#top');
          }}
        >
          {/* aria-label на ссылке задаёт доступное имя целиком, поэтому
              знак декоративен, а название на мобильных можно скрыть
              визуально без потери его для скринридеров. */}
          <img src={logoImage} alt="" className={styles.logoImage} aria-hidden="true" />
          <span className={styles.logoText} aria-hidden="true">
            {STUDIO_NAME}
          </span>
        </a>

        {/* На мобильных и планшетах якоря видны сразу и скроллятся по
            горизонтали — вместо отдельного бокового меню по кнопке. */}
        <nav
          ref={navRef}
          className={`${styles.nav} ${isNavScrollable ? styles.navScrollable : ''}`}
          aria-label="Основная навигация"
        >
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToSection(item.href);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          {/* Кнопка-приглашение к связи всегда полностью видна — в отличие
              от остальных якорей, она не участвует в горизонтальном скролле
              nav, чтобы не обрезаться маской на узких экранах. */}
          <a
            href={applyLink('header')}
            className={styles.navCta}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Подать заявку"
            onClick={() => reachGoal(METRIKA_GOALS.applyHeader)}
          >
            {/* На узких экранах место в шапке ограничено, поэтому кнопка
                сжимается до одной иконки — на десктопе рядом остаётся и
                подпись. aria-label на самой ссылке хранит доступное имя
                целиком, поэтому иконка декоративна. */}
            <TelegramLogo size={18} weight="fill" aria-hidden="true" />
            <span className={styles.navCtaLabel}>Заявка</span>
          </a>
        </div>
      </div>
    </header>
  );
}
