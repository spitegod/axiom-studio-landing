type SmoothScroller = {
  scrollTo: (
    target: HTMLElement | string | number,
    options?: { offset?: number; immediate?: boolean },
  ) => void;
};

let smoothScroll: SmoothScroller | null = null;

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

export function scrollToSection(href: string): void {
  const id = href.startsWith('#') ? href.slice(1) : href;
  const target = document.getElementById(id);

  if (!target) return;

  const reduced = prefersReducedMotion();

  if (smoothScroll && !reduced) {
    smoothScroll.scrollTo(target, { offset: -headerOffset() });
    return;
  }

  target.scrollIntoView({
    behavior: reduced ? 'auto' : 'smooth',
    block: 'start',
  });
}
