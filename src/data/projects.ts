import nexoraImage from '../assets/cases/nexora.jpg';
import luminaCloudImage from '../assets/cases/lumina-cloud.jpg';
import atlasCrmImage from '../assets/cases/atlas-crm.jpg';
import pulsebotImage from '../assets/cases/pulsebot.jpg';
import bazaarMiniImage from '../assets/cases/bazaar-mini.jpg';

export interface Project {
  label: string;
  type: string;
  image: string;
  description: string;
  tags: string[];
}

export const PROJECTS_TITLE = 'Избранные проекты';

// TODO: заменить карточки реальными кейсами студии.
// Lumina Cloud, Atlas CRM, Nexora, Pulsebot и Bazaar Mini — примеры продуктов,
// не клиентские проекты. Не добавлять сюда имена клиентов, зарубежные рынки,
// метрики и результаты.
// Когда появятся настоящие кейсы, для каждого заполнить: задача, что сделали,
// бизнес-результат. Цифры публиковать только подтверждённые владельцем.

export const PROJECTS: Project[] = [
  {
    label: 'Lumina Cloud',
    type: 'Веб-сайт',
    image: luminaCloudImage,
    description:
      'Платформа для управления облачной инфраструктурой: объясняет продукт и помогает с ним работать.',
    tags: ['Облако', 'Инфраструктура', 'Сайт'],
  },
  {
    label: 'Atlas CRM',
    type: 'CRM-система',
    image: atlasCrmImage,
    description: 'Система для отдела продаж: воронка сделок, карточки клиентов и аналитика в одном окне.',
    tags: ['Продажи', 'Воронка', 'Аналитика'],
  },
  {
    label: 'Nexora',
    type: 'Мобильное приложение',
    image: nexoraImage,
    description: 'Финансовое приложение: мультивалютные счета, картина расходов и понятный статус денег.',
    tags: ['Финансы', 'Счета', 'Приложение'],
  },
  {
    label: 'Pulsebot',
    type: 'Чат-бот',
    image: pulsebotImage,
    description: 'Бот для магазина: отвечает клиентам, помогает выбрать товар и доводит разговор до покупки.',
    tags: ['Бот', 'Каталог', 'Покупки'],
  },
  {
    label: 'Bazaar Mini',
    type: 'Telegram Mini App',
    image: bazaarMiniImage,
    description: 'Мини-приложение магазина в Telegram: каталог, кошелёк и оплата без перехода на внешний сайт.',
    tags: ['Telegram', 'Каталог', 'Оплата'],
  },
];
