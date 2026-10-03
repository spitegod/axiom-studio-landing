import { useEffect } from 'react';
import { Container } from '../ui';
import { STUDIO_NAME } from '../../data/contacts';
import {
  CONSENT_PARAGRAPHS,
  CONSENT_TITLE,
  OPERATOR_EMAIL,
  OPERATOR_FULL_NAME,
  OPERATOR_INN,
  PRIVACY_BLOCKS,
  PRIVACY_INTRO,
  PRIVACY_TITLE,
  PRIVACY_UPDATED,
} from '../../data/privacy';
import styles from './Privacy.module.scss';

const PLACEHOLDERS = [OPERATOR_FULL_NAME, OPERATOR_INN, OPERATOR_EMAIL].filter((item) =>
  item.startsWith('['),
);

function TextWithPlaceholders({ text }: { text: string }) {
  if (PLACEHOLDERS.length === 0) {
    return <>{text}</>;
  }

  const pattern = new RegExp(
    `(${PLACEHOLDERS.map((item) => item.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
    'g',
  );
  const parts = text.split(pattern).filter((part) => part.length > 0);

  return (
    <>
      {parts.map((part, index) =>
        PLACEHOLDERS.includes(part) ? (
          <span className={styles.placeholder} key={`${part}-${index}`}>
            {part}
          </span>
        ) : (
          <span key={`${index}-${part.slice(0, 16)}`}>{part}</span>
        ),
      )}
    </>
  );
}

export function Privacy() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${PRIVACY_TITLE} — ${STUDIO_NAME}`;
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <Container as="article" className={styles.page}>
      <div className={styles.sheet}>
      <header className={styles.intro}>
        <h1 className={styles.title}>{PRIVACY_TITLE}</h1>
        <p className={styles.date}>Редакция от {PRIVACY_UPDATED}</p>
        <p className={styles.lead}>
          <TextWithPlaceholders text={PRIVACY_INTRO} />
        </p>
      </header>

      {PRIVACY_BLOCKS.map((block) => (
        <section className={styles.section} id={block.id} key={block.id}>
          <h2 className={styles.heading}>{block.title}</h2>
          {block.paragraphs.map((paragraph) => (
            <p key={paragraph}>
              <TextWithPlaceholders text={paragraph} />
            </p>
          ))}
          {block.list && (
            <ul className={styles.list}>
              {block.list.map((item) => (
                <li key={item}>
                  <TextWithPlaceholders text={item} />
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}

      <section className={styles.consent} id="consent" aria-labelledby="consent-title">
        <h2 className={styles.heading} id="consent-title">
          {CONSENT_TITLE}
        </h2>
        {CONSENT_PARAGRAPHS.map((paragraph) => (
          <p key={paragraph}>
            <TextWithPlaceholders text={paragraph} />
          </p>
        ))}
      </section>
      </div>
    </Container>
  );
}
