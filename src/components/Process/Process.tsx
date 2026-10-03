import { useLayoutEffect, useRef, type CSSProperties } from 'react';
import { useReducedMotion, useScroll } from '../../motion';
import { Container } from '../ui';
import { PROCESS_LEAD, PROCESS_STEPS, PROCESS_TITLE } from '../../data/process';
import { SECTION_IDS } from '../../data/content';
import styles from './Process.module.scss';

const SEGMENTS = PROCESS_STEPS.length - 1;

export function Process() {
  const timelineRef = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 75%', 'end 45%'],
  });

  useLayoutEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    if (reduced !== false) {
      timeline.style.setProperty('--p', '1');
      return;
    }

    const apply = (value: number) => {
      timeline.style.setProperty('--p', value.toFixed(4));
    };

    apply(scrollYProgress.get());
    return scrollYProgress.on('change', apply);
  }, [reduced, scrollYProgress]);

  return (
    <section className={styles.section} id={SECTION_IDS.process}>
      <Container>
        <div className={`${styles.header} reveal`}>
          <h2 className={styles.title}>{PROCESS_TITLE}</h2>
          <p className={styles.lead}>{PROCESS_LEAD}</p>
        </div>

        <ol
          ref={timelineRef}
          className={styles.timeline}
          style={{ '--segments': SEGMENTS } as CSSProperties}
        >
          {PROCESS_STEPS.map((step, index) => (
            <li className={`${styles.step} reveal`} key={step.index}>
              <div className={styles.content}>
                <span className={styles.stepIndex}>{step.index}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>

              <div className={styles.markerCol} aria-hidden="true">
                <span className={styles.marker} />
                {index < PROCESS_STEPS.length - 1 && (
                  <span
                    className={styles.line}
                    style={{ '--i': index / SEGMENTS } as CSSProperties}
                  />
                )}
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
