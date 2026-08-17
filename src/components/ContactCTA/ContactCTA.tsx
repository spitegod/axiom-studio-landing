import { PaperPlaneTilt } from '@phosphor-icons/react';
import { Button, Container } from '../ui';
import { SECTION_IDS } from '../../data/content';
import { TELEGRAM_URL } from '../../data/contacts';
import styles from './ContactCTA.module.scss';

export function ContactCTA() {
  return (
    <section className={styles.section} id={SECTION_IDS.contact}>
      <Container>
        <div className={`${styles.panel} reveal`}>
          <div className={styles.glow} aria-hidden="true" />

          <div className={styles.content}>
            <h2 className={styles.title}>Есть идея? Давайте осуществим её вместе!</h2>
            <p className={styles.description}>
              Расскажите о задаче — обсудим проект, предложим подход и ответим
              на вопросы.
            </p>

            <Button
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="lg"
              icon={<PaperPlaneTilt size={18} weight="bold" aria-hidden="true" />}
            >
              Написать в Telegram
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
