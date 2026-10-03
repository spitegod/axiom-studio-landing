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
  return (
    <section className={styles.section} id={SECTION_IDS.faq}>
      <Container>
        <div className={`${styles.header} reveal`}>
          <h2 className={styles.title}>{FAQ_TITLE}</h2>
        </div>

        <div className={`${styles.list} reveal`}>
          {FAQ_ITEMS.map((item) => (
            <details key={item.question} className={styles.item}>
              <summary className={styles.question}>
                {item.question}
                <span className={styles.plus} aria-hidden="true" />
              </summary>
              <p className={styles.answer}>{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }}
      />
    </section>
  );
}
