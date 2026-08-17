export interface ProcessStep {
  index: string;
  title: string;
  description: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    index: '01',
    title: 'Знакомство и бриф',
    description: 'Обсуждаем задачу, аудиторию и ожидания от сайта.',
  },
  {
    index: '02',
    title: 'Аналитика и прототип',
    description: 'Продумываем структуру страниц и логику взаимодействия.',
  },
  {
    index: '03',
    title: 'Дизайн',
    description: 'Разрабатываем визуальный стиль и интерфейс на основе прототипа.',
  },
  {
    index: '04',
    title: 'Разработка',
    description: 'Вёрстка и программирование по утверждённому дизайну.',
  },
  {
    index: '05',
    title: 'Тестирование и запуск',
    description: 'Проверяем работу на устройствах и публикуем сайт.',
  },
  {
    index: '06',
    title: 'Поддержка',
    description: 'Следим за стабильностью и помогаем с доработками после запуска.',
  },
];
