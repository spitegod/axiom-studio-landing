import { Devices } from '@phosphor-icons/react';
import { Button, Container, SocialLinks } from '../ui';
import { SECTION_IDS } from '../../data/content';
import { scrollToSection } from '../../utils/scrollToSection';
import styles from './Hero.module.scss';

export function Hero() {
  return (
    <section className={styles.hero} id="top">
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.grid} aria-hidden="true" />

      <Container className={styles.inner}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Продукты, которые выдерживают проверку
          </h1>

          <p className={styles.description}>
            Берём на себя весь процесс — от идеи и дизайна до разработки,
            запуска и дальнейшей поддержки.
          </p>

          <div className={styles.actions}>
            <SocialLinks size="lg" framed className={styles.heroSocial} />
            <Button
              variant="secondary-on-dark"
              size="lg"
              onClick={() => scrollToSection(`#${SECTION_IDS.projects}`)}
            >
              Посмотреть работы
            </Button>
          </div>
        </div>

        <div className={styles.visual} aria-hidden="true">
          <div className={styles.browserCard}>
            <div className={styles.browserTopBar}>
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.browserUrl}>studio.site</span>
            </div>
            <div className={styles.browserBody}>
              <div className={styles.wireframeHero}>
                <span className={styles.wireLineLg} />
                <span className={styles.wireLineSm} />
                <span className={styles.wireAccentBlock} />
              </div>
              <div className={styles.wireframeGrid}>
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>

          <div className={styles.codeCard}>
            <div className={styles.codeTopBar}>
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
            </div>
            <div className={styles.codeLines}>
              <span style={{ width: '78%' }} />
              <span style={{ width: '52%' }} />
              <span style={{ width: '64%' }} />
              <span style={{ width: '40%' }} />
            </div>
          </div>

          <div className={styles.badgeCard}>
            <span className={styles.badgeIcon}>
              <Devices size={18} weight="duotone" aria-hidden="true" />
            </span>
            <div>
              <p className={styles.badgeTitle}>Адаптивная вёрстка</p>
              <p className={styles.badgeSubtitle}>Любые устройства</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
