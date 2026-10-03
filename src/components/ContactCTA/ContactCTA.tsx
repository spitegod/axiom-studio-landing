import { ApplyButton, Container } from '../ui';
import { SECTION_IDS } from '../../data/content';
import { FINAL_CTA } from '../../data/cta';
import { APPLY_HINT } from '../../data/contacts';
import styles from './ContactCTA.module.scss';

export function ContactCTA() {
  return (
    <section className={styles.section} id={SECTION_IDS.contact}>
      <Container>
        <div className={`${styles.panel} reveal`}>
          <div className={styles.glow} aria-hidden="true" />

          <div className={styles.content}>
            <h2 className={styles.title}>{FINAL_CTA.title}</h2>
            <p className={styles.description}>{FINAL_CTA.description}</p>

            <ApplyButton source="final">{FINAL_CTA.button}</ApplyButton>

            <p className={styles.hint}>{APPLY_HINT}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
