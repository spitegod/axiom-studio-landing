import { CheckCircle, XCircle } from '@phosphor-icons/react';
import { Container } from '../ui';
import { FOUNDER_FIT } from '../../data/founderFit';
import { SECTION_IDS } from '../../data/content';
import styles from './FounderFit.module.scss';

export function FounderFit() {
  return (
    <section className={styles.section} id={SECTION_IDS.fit} aria-labelledby="fit-title">
      <Container>
        <div className={`${styles.header} reveal`}>
          <h2 id="fit-title" className={styles.title}>
            {FOUNDER_FIT.title}
          </h2>
          <p className={styles.lead}>{FOUNDER_FIT.lead}</p>
        </div>

        <div className={styles.columns}>
          <article className={`${styles.card} reveal`}>
            <h3 className={styles.cardTitle}>{FOUNDER_FIT.goodTitle}</h3>
            <ul className={styles.list}>
              {FOUNDER_FIT.good.map((item) => (
                <li key={item} className={styles.point}>
                  <CheckCircle
                    className={styles.iconGood}
                    size={22}
                    weight="duotone"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className={`${styles.card} reveal`}>
            <h3 className={styles.cardTitle}>{FOUNDER_FIT.badTitle}</h3>
            <ul className={styles.list}>
              {FOUNDER_FIT.bad.map((item) => (
                <li key={item} className={styles.point}>
                  <XCircle className={styles.iconBad} size={22} weight="duotone" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </Container>
    </section>
  );
}
