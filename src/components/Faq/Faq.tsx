import { useState } from 'react';
import { Container } from '../ui';
import { FAQ_ITEMS, FAQ_TITLE } from '../../data/faq';
import { SECTION_IDS } from '../../data/content';
import styles from './Faq.module.scss';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

export function Faq() {
  const [open, setOpen] = useState<ReadonlySet<string>>(() => new Set());

  function toggle(question: string) {
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(question)) next.delete(question);
      else next.add(question);
      return next;
    });
  }

  return (
    <section className={styles.section} id={SECTION_IDS.faq}>
      <Container>
        <div className={`${styles.header} reveal`}>
          <h2 className={styles.title}>{FAQ_TITLE}</h2>
        </div>

        <div className={`${styles.list} reveal`}>
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = open.has(item.question);
            const panelId = `faq-panel-${index}`;

            return (
              <div className={styles.item} key={item.question}>
                <button
                  type="button"
                  className={styles.question}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(item.question)}
                >
                  {item.question}
                  <span className={styles.plus} data-open={isOpen} aria-hidden="true" />
                </button>

                <div id={panelId} role="region" className={styles.panel} data-open={isOpen}>
                  <div className={styles.panelInner}>
                    <p className={styles.answer} aria-hidden={!isOpen}>
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }}
      />
    </section>
  );
}
