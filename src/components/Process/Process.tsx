import { Container } from '../ui';
import { PROCESS_STEPS } from '../../data/process';
import { SECTION_IDS } from '../../data/content';
import styles from './Process.module.scss';

export function Process() {
  return (
    <section className={`${styles.section} reveal`} id={SECTION_IDS.process}>
      <Container>
        <div className={styles.header}>
          <h2 className={styles.title}>От идеи до готового продукта</h2>
        </div>

        <ol className={styles.timeline}>
          {PROCESS_STEPS.map((step, index) => (
            <li className={styles.step} key={step.index}>
              <div className={styles.content}>
                <span className={styles.stepIndex}>{step.index}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>

              <div className={styles.markerCol} aria-hidden="true">
                <span className={styles.marker} />
                {index < PROCESS_STEPS.length - 1 && <span className={styles.line} />}
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
