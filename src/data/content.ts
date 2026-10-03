// Контентные данные страницы.
// Вынесены отдельно от компонентов, чтобы тексты, ссылки и наборы карточек
// можно было заменить без правки разметки.

export const SECTION_IDS = {
  partnership: 'partnership',
  exchange: 'exchange',
  process: 'process',
  fit: 'fit',
  projects: 'projects',
  faq: 'faq',
  contact: 'contact',
} as const;

export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Партнёрство', href: `#${SECTION_IDS.partnership}` },
  { label: 'Процесс', href: `#${SECTION_IDS.process}` },
  { label: 'Проекты', href: `#${SECTION_IDS.projects}` },
  { label: 'Вопросы', href: `#${SECTION_IDS.faq}` },
];
