import type { Icon } from '@phosphor-icons/react';
import { ArrowsClockwise, Devices, Globe, Layout, Robot, Stack } from '@phosphor-icons/react';

export interface Service {
  icon: Icon;
  title: string;
  description: string;
}

// Порядок влияет на раскладку Bento-сетки в Services.module.scss
// (чередование широких и узких плиток) — при добавлении/удалении
// элементов стоит свериться со стилями.
export const SERVICES: Service[] = [
  {
    icon: Layout,
    title: 'Лендинги',
    description: 'Одностраничные сайты под конкретную задачу: продукт, услугу или запуск.',
  },
  {
    icon: Globe,
    title: 'Сайты',
    description: 'Любой формат сайта под вашу задачу — от визитки до сложного портала.',
  },
  {
    icon: Stack,
    title: 'Веб-сервисы',
    description: 'Личные кабинеты, панели управления и другие продукты с логикой внутри.',
  },
  {
    icon: ArrowsClockwise,
    title: 'Автоматизация бизнеса',
    description: 'CRM, интеграции и сценарии, которые снимают рутину с команды и ускоряют процессы.',
  },
  {
    icon: Robot,
    title: 'Боты и мини-приложения',
    description: 'Чат-боты и мини-приложения для Telegram, MAX и других соцсетей.',
  },
  {
    icon: Devices,
    title: 'Кроссплатформенные приложения',
    description: 'Одна кодовая база — приложения для iOS, Android и веба одновременно.',
  },
];
