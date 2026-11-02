import { useEffect, useState } from 'react';
import logoImage from '../../assets/axiom-logo.png';
import { STUDIO_NAME } from '../../data/contacts';
import styles from './Intro.module.scss';

const HOLD_MS = 2600;
const FADE_MS = 700;

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function Intro() {
  const [phase, setPhase] = useState<'in' | 'out' | 'gone'>('in');

  useEffect(() => {
    const reduced = prefersReducedMotion();
    const hold = reduced ? 0 : HOLD_MS;
    const fade = reduced ? 0 : FADE_MS;

    document.documentElement.classList.add('intro-active');

    const hide = window.setTimeout(() => setPhase('out'), hold);
    const remove = window.setTimeout(() => {
      setPhase('gone');
      document.documentElement.classList.remove('intro-active');
    }, hold + fade);

    return () => {
      window.clearTimeout(hide);
      window.clearTimeout(remove);
      document.documentElement.classList.remove('intro-active');
    };
  }, []);

  if (phase === 'gone') return null;

  return (
    <div
      className={`${styles.overlay} ${phase === 'out' ? styles.hidden : ''}`}
      role="presentation"
    >
      <div className={styles.wash} aria-hidden="true" />
      <div className={styles.shimmer} aria-hidden="true" />
      <img src={logoImage} alt={STUDIO_NAME} className={styles.logo} />
    </div>
  );
}
