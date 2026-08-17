import { Container } from '../ui';
import { ADVANTAGES } from '../../data/advantages';
import styles from './Advantages.module.scss';

export function Advantages() {
  return (
    <section className={`${styles.section} reveal`} aria-labelledby="advantages-title">
      <Container>
        <h2 id="advantages-title" className="visually-hidden">
          Принципы работы
        </h2>
        <ul className={styles.list}>
          {ADVANTAGES.map((advantage) => {
            const Icon = advantage.icon;
            return (
              <li className={styles.item} key={advantage.title}>
                <span className={styles.iconWrap}>
                  <Icon size={26} weight="duotone" aria-hidden="true" />
                </span>
                <h3 className={styles.itemTitle}>{advantage.title}</h3>
                <p className={styles.itemDescription}>{advantage.description}</p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
