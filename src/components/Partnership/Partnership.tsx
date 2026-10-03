import { Container } from '../ui';
import { PARTNERSHIP, PARTNERSHIP_POINTS } from '../../data/partnership';
import { SECTION_IDS } from '../../data/content';
import styles from './Partnership.module.scss';

export function Partnership() {
  return (
    <section className={styles.section} id={SECTION_IDS.partnership}>
      <Container>
        <div className={`${styles.header} reveal`}>
          <h2 className={styles.title}>{PARTNERSHIP.title}</h2>
          <p className={styles.lead}>{PARTNERSHIP.lead}</p>
        </div>

        <ul className={`${styles.grid} reveal-stagger`}>
          {PARTNERSHIP_POINTS.map((point) => {
            const Icon = point.icon;
            return (
              <li className={`${styles.card} reveal`} key={point.title}>
                <span className={styles.iconWrap}>
                  <Icon size={24} weight="duotone" aria-hidden="true" />
                </span>
                <h3 className={styles.cardTitle}>{point.title}</h3>
                <p className={styles.cardDescription}>{point.description}</p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
