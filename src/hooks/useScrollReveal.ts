import { useLayoutEffect } from 'react';

/**
 * Плавно показывает элементы с классом `reveal` при появлении во вьюпорте.
 * Достаточно вызвать один раз на верхнем уровне приложения — хук сам находит
 * все подходящие элементы, в том числе добавленные другими секциями.
 */
export function useScrollReveal() {
  useLayoutEffect(() => {
    // В пререндере контент виден до загрузки скрипта (см. #prerender-reveal).
    // Классы ниже выставляем в этом же кадре, до снятия этого правила,
    // чтобы уже видимые блоки не мигали.
    const boot = document.getElementById('prerender-reveal');

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const elements = document.querySelectorAll<HTMLElement>('.reveal');

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('is-visible'));
      boot?.remove();
      return;
    }

    const toObserve: HTMLElement[] = [];

    elements.forEach((el) => {
      // Элемент уже частично попадает в область первого экрана при самой
      // загрузке страницы (скролла ещё не было) — показываем его сразу и без
      // анимации. Иначе он остаётся невидимым до первого скролла, хотя место
      // под него уже занято в разметке, и получается пустая полоса там, где
      // на самом деле есть контент. useLayoutEffect гарантирует, что это
      // происходит до отрисовки кадра, без мигания.
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add('is-visible', 'reveal--instant');
      } else {
        toObserve.push(el);
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
    );

    toObserve.forEach((el) => observer.observe(el));
    boot?.remove();

    return () => observer.disconnect();
  }, []);
}
