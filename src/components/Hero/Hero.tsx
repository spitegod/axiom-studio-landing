import { ArrowDown, Handshake } from '@phosphor-icons/react';
import { ApplyButton, Button, Container } from '../ui';
import { SECTION_IDS } from '../../data/content';
import { HERO, HERO_VISUAL } from '../../data/hero';
import { scrollToSection } from '../../utils/scrollToSection';
import styles from './Hero.module.scss';

export function Hero() {
  return (
    <section className={styles.hero} id="top">
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.grid} aria-hidden="true" />

      <Container className={styles.inner}>
        <div className={styles.content}>
          <h1 className={styles.title}>{HERO.title}</h1>

          <p className={styles.description}>{HERO.description}</p>

          <div className={styles.actions}>
            <ApplyButton source="hero">{HERO.primaryCta}</ApplyButton>
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
          </div>

          <ul className={styles.facts}>
            {HERO.facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </div>

        <div className={styles.visual} aria-hidden="true">
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
        </div>
      </Container>
    </section>
  );
}
