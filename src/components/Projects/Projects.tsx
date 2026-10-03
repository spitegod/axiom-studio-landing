import { Container } from '../ui';
import { PROJECTS, PROJECTS_TITLE } from '../../data/projects';
import { SECTION_IDS } from '../../data/content';
import styles from './Projects.module.scss';

export function Projects() {
  return (
    <section className={styles.section} id={SECTION_IDS.projects}>
      <Container>
        <div className={`${styles.header} reveal`}>
          <h2 className={styles.title}>{PROJECTS_TITLE}</h2>
        </div>

        {/* Каждый проект — отдельный reveal-элемент, как и плитки услуг:
            карточки проявляются по одной по мере прокрутки, а не все
            разом одним блоком. */}
        <ul className={styles.list}>
          {PROJECTS.map((project, index) => (
            <li
              className={`${styles.item} reveal`}
              key={project.label}
              data-reverse={index % 2 === 1}
            >
              <div className={styles.visual}>
                <img
                  src={project.image}
                  alt={`Превью проекта ${project.label}`}
                  className={styles.visualImage}
                  loading="lazy"
                />
              </div>

              <div className={styles.content}>
                <div className={styles.meta}>
                  <h3 className={styles.label}>{project.label}</h3>
                  <p className={styles.type}>{project.type}</p>
                </div>
                <p className={styles.description}>{project.description}</p>
                <ul className={styles.tags}>
                  {project.tags.map((tag) => (
                    <li key={tag} className={styles.tag}>
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
