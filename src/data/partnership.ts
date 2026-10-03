import type { Icon } from '@phosphor-icons/react';
import { Handshake, ListChecks, Percent } from '@phosphor-icons/react';

export interface PartnershipPoint {
  icon: Icon;
  title: string;
  description: string;
}

export const PARTNERSHIP = {
  title: 'Как устроено партнёрство',
  lead: 'Мы строим стартап вместе с основателем: делаем продукт, запускаем его и приводим первых клиентов. Взамен — доля в компании или процент от выручки, не оплата за разработку.',
} as const;

export const PARTNERSHIP_POINTS: PartnershipPoint[] = [
  {
    icon: Handshake,
    title: 'Работаем за долю',
    description:
      'Продукт, разработка, запуск и первые клиенты не выставляются счётом. Мы зарабатываем вместе с проектом: долей или процентом от выручки.',
  },
  {
    icon: Percent,
    title: 'Размер согласуем индивидуально',
    description:
      'Готового процента нет. Доля в компании или процент от выручки зависят от объёма работ и вклада сторон и согласуются с каждым партнёром отдельно.',
  },
  {
    icon: ListChecks,
    title: 'План собираем вместе',
    description:
      'Этапы, роли и результат каждого шага договариваем с основателем под конкретный проект. Общего календаря на все стартапы нет.',
  },
];
