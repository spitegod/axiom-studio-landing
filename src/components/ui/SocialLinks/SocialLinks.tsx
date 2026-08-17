import { ChatCircleDots, TelegramLogo } from '@phosphor-icons/react';
import { MAX_URL, TELEGRAM_URL } from '../../../data/contacts';
import styles from './SocialLinks.module.scss';

interface SocialLinksProps {
  size?: 'md' | 'lg';
  /** Добавляет обводку-подложку — для мест, где блок стоит отдельно на
   * пустом фоне (Hero) и без неё потерялся бы. */
  framed?: boolean;
  className?: string;
}

// Замена одиночной CTA-кнопки ("Обсудить проект") на подпись с двумя
// каналами связи: у бизнеса пока нет единого "основного" мессенджера,
// поэтому предлагаем сразу оба варианта вместо одной ссылки.
export function SocialLinks({ size = 'md', framed = false, className }: SocialLinksProps) {
  const classes = [styles.wrapper, styles[size], framed && styles.framed, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      <span className={styles.label}>Мы в соц сетях</span>
      <div className={styles.icons}>
        <a
          href={MAX_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.iconLink}
          aria-label="Написать нам в MAX"
        >
          <ChatCircleDots size={20} weight="bold" aria-hidden="true" />
        </a>
        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.iconLink}
          aria-label="Написать нам в Telegram"
        >
          <TelegramLogo size={20} weight="fill" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
