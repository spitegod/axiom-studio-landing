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
import { scrollToSection } from '../../utils/scrollToSection';
import styles from './Footer.module.scss';

export function Footer() {
  const year = new Date().getFullYear();

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
        </div>
      </Container>
    </footer>
  );
}
