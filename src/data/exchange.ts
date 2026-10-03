export interface ExchangeItem {
  title: string;
  description: string;
}

export const EXCHANGE = {
  title: 'Что даёт студия и что даёт основатель',
  lead: 'Основатель отвечает за рынок. Студия — за продукт, запуск и первых клиентов.',
  studioTitle: 'Студия',
  founderTitle: 'Основатель',
} as const;

export const STUDIO_GIVES: ExchangeItem[] = [
  {
    title: 'Продукт',
    description: 'Собираем, что именно продаём, кому и почему это купят.',
  },
  {
    title: 'Разработка',
    description: 'Делаем продукт, с которым клиент может работать и платить.',
  },
  {
    title: 'Запуск',
    description: 'Выводим продукт к людям, чтобы им начали пользоваться.',
  },
  {
    title: 'Первые клиенты',
    description: 'Привлекаем трафик и доводим до первых продаж.',
  },
];

export const FOUNDER_GIVES: ExchangeItem[] = [
  {
    title: 'Знание рынка',
    description: 'Понимаете нишу, боли клиентов и как устроена сделка.',
  },
  {
    title: 'Энергия основателя',
    description: 'Ведёте проект и принимаете решения, а не передаёте идею.',
  },
  {
    title: 'Кто платит',
    description: 'Понятно, кому продаём и за что клиент отдаёт деньги.',
  },
];
