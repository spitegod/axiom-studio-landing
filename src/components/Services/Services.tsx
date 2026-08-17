import { Container } from '../ui';
import { SERVICES } from '../../data/services';
import { SECTION_IDS } from '../../data/content';
import styles from './Services.module.scss';

export function Services() {
  return (
    <section className={styles.section} id={SECTION_IDS.services}>
      <Container>
        <div className={`${styles.header} reveal`}>
          <h2 className={styles.title}>Разрабатываем решения под задачи бизнеса</h2>
        </div>

        {/* Каждая плитка — самостоятельный reveal-элемент: карточки одного
            ряда занимают одинаковую высоту от верха секции, поэтому
            IntersectionObserver показывает их почти одновременно, и в
            результате плитки проявляются рядами по мере скролла, а не все
            сразу одним блоком. */}
        <ul className={styles.grid}>
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <li className={`${styles.tile} reveal`} key={service.title}>
                <span className={styles.iconWrap}>
                  <Icon size={24} weight="duotone" aria-hidden="true" />
                </span>
                <div className={styles.tileText}>
                  <h3 className={styles.tileTitle}>{service.title}</h3>
                  <p className={styles.tileDescription}>{service.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
