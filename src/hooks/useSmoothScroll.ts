import { useEffect } from 'react';
import { registerSmoothScroll } from '../utils/scrollToSection';

/**
 * Плавный скролл Lenis только на широком экране с мышью.
 * На телефонах остаётся нативный скролл: он и так инерционный, а Lenis там
 * чаще мешает, чем помогает. Чанк библиотеки подгружается отдельно.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const desktopPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const wide = window.matchMedia('(min-width: 1024px)').matches;

    if (reduced || !desktopPointer || !wide) return;

    let cancelled = false;
    let destroy = () => {};

    import('lenis').then(({ default: Lenis }) => {
      if (cancelled) return;

      const lenis = new Lenis({
        autoRaf: true,
        duration: 1.05,
        smoothWheel: true,
        anchors: false,
      });

      document.documentElement.classList.add('has-smooth-scroll');
      registerSmoothScroll(lenis);

      destroy = () => {
        registerSmoothScroll(null);
        document.documentElement.classList.remove('has-smooth-scroll');
        lenis.destroy();
      };
    });

    return () => {
      cancelled = true;
      destroy();
    };
  }, []);
}
