import { useRef, type PointerEvent } from 'react';
import { useReducedMotion } from '../../motion';
import { Container } from '../ui';
import { PROJECTS, PROJECTS_TITLE } from '../../data/projects';
import { SECTION_IDS } from '../../data/content';
import styles from './Projects.module.scss';

function ProjectFrame({ src, alt }: { src: string; alt: string }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  function setTilt(rx: number, ry: number, tx: number, ty: number) {
    const frame = frameRef.current;
    if (!frame) return;
    frame.style.setProperty('--rx', `${rx}deg`);
    frame.style.setProperty('--ry', `${ry}deg`);
    frame.style.setProperty('--tx', `${tx}px`);
    frame.style.setProperty('--ty', `${ty}px`);
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduced || event.pointerType !== 'mouse' || !frameRef.current) return;
    const box = frameRef.current.getBoundingClientRect();
    const px = (event.clientX - box.left) / box.width - 0.5;
    const py = (event.clientY - box.top) / box.height - 0.5;
    setTilt(-py * 7, px * 8, px * -14, py * -14);
  }

  return (
    <div
      ref={frameRef}
      className={styles.visual}
      onPointerMove={onPointerMove}
      onPointerLeave={() => setTilt(0, 0, 0, 0)}
    >
      <img src={src} alt={alt} className={styles.visualImage} loading="lazy" />
    </div>
  );
}

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
        <ul className={`${styles.list} reveal-stagger`}>
          {PROJECTS.map((project, index) => (
            <li
              className={`${styles.item} reveal`}
              key={project.label}
              data-reverse={index % 2 === 1}
            >
              <ProjectFrame src={project.image} alt={`Превью проекта ${project.label}`} />

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
