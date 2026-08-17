import type { Icon } from '@phosphor-icons/react';
import { Devices, GitBranch, HandHeart, Package } from '@phosphor-icons/react';

export interface Advantage {
  icon: Icon;
  title: string;
  description: string;
}

export const ADVANTAGES: Advantage[] = [
  {
    icon: Package,
    title: 'Разработка под ключ',
    description: 'Берём на себя весь процесс — от идеи до запуска, без лишних передач между подрядчиками.',
  },
  {
    icon: Devices,
    title: 'Индивидуальный дизайн',
    description: 'Наши дизайнеры визуализируют любой ваш запрос.',
  },
  {
    icon: GitBranch,
    title: 'Прозрачные этапы',
    description: 'На каждом шаге понятно, что сделано и что будет дальше.',
  },
  {
    icon: HandHeart,
    title: 'Поддержка после запуска',
    description: 'Остаёмся на связи и поддерживаем вас в любое время суток.',
  },
];
