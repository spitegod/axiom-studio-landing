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
