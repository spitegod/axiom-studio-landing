type SmoothScroller = {
  scrollTo: (
    target: HTMLElement | string | number,
    options?: {
      offset?: number;
      immediate?: boolean;
      duration?: number;
      easing?: (t: number) => number;
      lock?: boolean;
      force?: boolean;
    },
  ) => void;
};

let smoothScroll: SmoothScroller | null = null;
let cancelNative: (() => void) | null = null;

export function registerSmoothScroll(instance: SmoothScroller | null): void {
  smoothScroll = instance;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function headerOffset(): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--header-height');
  const value = Number.parseFloat(raw);
  return Number.isFinite(value) ? value : 76;
}

// Мягкий разгон и мягкое торможение: без рывка на старте и без «удара» в конце.
const easeInOutCubic = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// Длительность растёт с расстоянием: соседний блок — быстро, через всю страницу —
// дольше, но не затянуто. Значение в секундах.
function durationFor(distance: number): number {
  return Math.min(1.5, Math.max(0.7, 0.5 + Math.abs(distance) / 3000));
}

function targetTop(target: HTMLElement): number {
  return Math.max(0, target.getBoundingClientRect().top + window.scrollY - headerOffset());
}

function nativeSmoothScroll(to: number, durationSec: number): void {
  cancelNative?.();

  const root = document.documentElement;
  const from = window.scrollY;
  const distance = to - from;
  if (Math.abs(distance) < 1) return;

  // CSS scroll-behavior: smooth превращал бы каждый шаг анимации в свою
  // анимацию и давал дёрганье — на время прокрутки отключаем его.
  const prevBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = 'auto';

  const duration = durationSec * 1000;
  let start: number | null = null;
  let frame = 0;

  const stop = () => {
    cancelAnimationFrame(frame);
    root.style.scrollBehavior = prevBehavior;
    window.removeEventListener('wheel', stop);
    window.removeEventListener('touchstart', stop);
    window.removeEventListener('keydown', stop);
    cancelNative = null;
  };

  const step = (now: number) => {
    if (start === null) start = now;
    const progress = Math.min(1, (now - start) / duration);
    window.scrollTo(0, from + distance * easeInOutCubic(progress));
    if (progress < 1) {
      frame = requestAnimationFrame(step);
    } else {
      stop();
    }
  };

  // Пользователь крутит колесо или касается экрана — сразу отдаём ему управление.
  window.addEventListener('wheel', stop, { passive: true });
  window.addEventListener('touchstart', stop, { passive: true });
  window.addEventListener('keydown', stop);

  cancelNative = stop;
  frame = requestAnimationFrame(step);
}

export function scrollToSection(href: string): void {
  const id = href.startsWith('#') ? href.slice(1) : href;
  const target = document.getElementById(id);

  if (!target) return;

  const to = id === 'top' ? 0 : targetTop(target);

  if (prefersReducedMotion()) {
    const root = document.documentElement;
    const prev = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    window.scrollTo(0, to);
    root.style.scrollBehavior = prev;
    return;
  }

  const duration = durationFor(to - window.scrollY);

  if (smoothScroll) {
    smoothScroll.scrollTo(to, { duration, easing: easeInOutCubic, lock: true, force: true });
    return;
  }

  nativeSmoothScroll(to, duration);
}
