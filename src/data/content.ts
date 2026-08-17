// Контентные данные страницы.
// Вынесены отдельно от компонентов, чтобы тексты, ссылки и наборы карточек
// можно было заменить без правки разметки.

export const SECTION_IDS = {
  services: 'services',
  projects: 'projects',
  process: 'process',
  contact: 'contact',
} as const;

export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Услуги', href: `#${SECTION_IDS.services}` },
  { label: 'Проекты', href: `#${SECTION_IDS.projects}` },
  { label: 'Этапы', href: `#${SECTION_IDS.process}` },
  { label: 'Связаться', href: `#${SECTION_IDS.contact}` },
];
