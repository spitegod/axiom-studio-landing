import { useEffect, useState } from 'react';
import { ArrowDown, Handshake } from '@phosphor-icons/react';
import { m } from '../../motion';
import { ApplyButton, Button, Container, Magnetic } from '../ui';
import { SECTION_IDS } from '../../data/content';
import { HERO, HERO_VISUAL } from '../../data/hero';
import { EASE } from '../../motion/ease';
import { scrollToSection } from '../../utils/scrollToSection';
import styles from './Hero.module.scss';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

const titleWords = HERO.title.split(' ');

export function Hero() {
  const [offscreen, setOffscreen] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('top');
    if (!hero || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => setOffscreen(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`${styles.hero} ${offscreen ? styles.paused : ''}`} id="top">
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.orb} aria-hidden="true" />
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.noise} aria-hidden="true" />

      <Container className={styles.inner}>
        <div className={styles.content}>
          <m.h1
            className={styles.title}
            aria-label={HERO.title}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.045, delayChildren: 0.08 } },
            }}
          >
            {titleWords.map((word, index) => (
              <m.span
                key={`${word}-${index}`}
                className={styles.word}
                aria-hidden="true"
                variants={fadeUp}
              >
                {word}
              </m.span>
            ))}
          </m.h1>

          <m.p
            className={styles.description}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.42, ease: EASE }}
          >
            {HERO.description}
          </m.p>

          <m.div
            className={styles.actions}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.54, ease: EASE }}
          >
            <Magnetic className={styles.magnetic}>
              <ApplyButton source="hero">{HERO.primaryCta}</ApplyButton>
            </Magnetic>
            <Button
              href={`#${SECTION_IDS.partnership}`}
              variant="secondary-on-dark"
              size="lg"
              icon={<ArrowDown size={18} weight="bold" aria-hidden="true" />}
              onClick={(event) => {
                event.preventDefault();
                scrollToSection(`#${SECTION_IDS.partnership}`);
              }}
            >
              {HERO.secondaryCta}
            </Button>
          </m.div>

          <m.ul
            className={styles.facts}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.07, delayChildren: 0.66 } },
            }}
          >
            {HERO.facts.map((fact) => (
              <m.li key={fact} variants={fadeUp}>
                {fact}
              </m.li>
            ))}
          </m.ul>
        </div>

        <m.div
          className={styles.visual}
          aria-hidden="true"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.28, ease: EASE }}
        >
          <div className={styles.splitCard}>
            <div className={styles.splitHead}>
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.splitHeadLabel}>{HERO_VISUAL.cardLabel}</span>
            </div>
            <div className={styles.splitBody}>
              <div className={styles.splitCol}>
                <span className={styles.splitEyebrow}>{HERO_VISUAL.founderLabel}</span>
                <ul className={styles.splitList}>
                  {HERO_VISUAL.founderPoints.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
              <div className={`${styles.splitCol} ${styles.splitColAccent}`}>
                <span className={styles.splitEyebrow}>{HERO_VISUAL.studioLabel}</span>
                <ul className={styles.splitList}>
                  {HERO_VISUAL.studioPoints.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className={styles.noteCard}>
            <span className={styles.noteAccent} />
            <p className={styles.noteTitle}>{HERO_VISUAL.noteTitle}</p>
            <p className={styles.noteText}>{HERO_VISUAL.noteText}</p>
          </div>

          <div className={styles.badgeCard}>
            <span className={styles.badgeIcon}>
              <Handshake size={18} weight="duotone" aria-hidden="true" />
            </span>
            <div>
              <p className={styles.badgeTitle}>{HERO_VISUAL.badgeTitle}</p>
              <p className={styles.badgeSubtitle}>{HERO_VISUAL.badgeText}</p>
            </div>
          </div>
        </m.div>
      </Container>
    </section>
  );
}
