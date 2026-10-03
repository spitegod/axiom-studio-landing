import { Container } from '../ui';
import { EXCHANGE, FOUNDER_GIVES, STUDIO_GIVES } from '../../data/exchange';
import { SECTION_IDS } from '../../data/content';
import styles from './Exchange.module.scss';

export function Exchange() {
  return (
    <section className={styles.section} id={SECTION_IDS.exchange} aria-labelledby="exchange-title">
      <Container>
        <div className={`${styles.header} reveal`}>
          <h2 id="exchange-title" className={styles.title}>
            {EXCHANGE.title}
          </h2>
          <p className={styles.lead}>{EXCHANGE.lead}</p>
        </div>

        <div className={styles.columns}>
          <article className={`${styles.panel} ${styles.panelStudio} reveal`}>
            <h3 className={styles.panelTitle}>{EXCHANGE.studioTitle}</h3>
            <ul className={styles.list}>
              {STUDIO_GIVES.map((item) => (
                <li key={item.title}>
                  <p className={styles.itemTitle}>{item.title}</p>
                  <p className={styles.itemDescription}>{item.description}</p>
                </li>
              ))}
            </ul>
          </article>

          <article className={`${styles.panel} ${styles.panelFounder} reveal`}>
            <h3 className={styles.panelTitle}>{EXCHANGE.founderTitle}</h3>
            <ul className={styles.list}>
              {FOUNDER_GIVES.map((item) => (
                <li key={item.title}>
                  <p className={styles.itemTitle}>{item.title}</p>
                  <p className={styles.itemDescription}>{item.description}</p>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </Container>
    </section>
  );
}
