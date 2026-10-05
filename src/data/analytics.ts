/**
 * TODO: вставить номер счётчика Яндекс.Метрики (целое число из кабинета Метрики).
 * Пока null, сниппет не подключается и запросов в Метрику нет.
 * Не подставляйте вымышленный id.
 */
export const YANDEX_METRIKA_ID: number | null = null;

export const METRIKA_GOALS = {
  applyHeader: 'apply_header',
  applyHero: 'apply_hero',
  applyFinal: 'apply_final',
  contactManager: 'contact_manager',
} as const;

const TAG_SRC = 'https://mc.yandex.ru/metrika/tag.js';
const INSTALLED_ATTR = 'data-yandex-metrika-id';

declare global {
  interface Window {
    ym?: (counterId: number, method: string, ...args: unknown[]) => void;
  }
}

export function isMetrikaEnabled(id: number | null): id is number {
  return typeof id === 'number' && Number.isInteger(id) && id > 0;
}

/**
 * Официальный сниппет Метрики. Вызывается только при заданном id счётчика.
 */
export function installYandexMetrika(id: number | null): void {
  if (!isMetrikaEnabled(id)) return;
  if (document.documentElement.getAttribute(INSTALLED_ATTR) === String(id)) return;

  document.documentElement.setAttribute(INSTALLED_ATTR, String(id));

  const script = document.createElement('script');
  script.id = 'yandex-metrika';
  script.text = `
    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
    (window, document, "script", "${TAG_SRC}", "ym");
    ym(${id}, "init", {clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true});
  `;
  document.head.appendChild(script);
}

export function reachGoal(goal: string): void {
  if (!isMetrikaEnabled(YANDEX_METRIKA_ID)) return;
  window.ym?.(YANDEX_METRIKA_ID, 'reachGoal', goal);
}
