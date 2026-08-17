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

export const PROJECTS: Project[] = [
  {
    label: 'Lumina Cloud',
    type: 'Веб-сайт',
    image: luminaCloudImage,
    description:
      'B2B SaaS-платформа для европейских компаний: сайт помогает управлять облачной инфраструктурой и презентует продукт корпоративным клиентам.',
    tags: ['UX/UI-дизайн', 'Веб-разработка', 'CMS'],
  },
  {
    label: 'Atlas CRM',
    type: 'CRM-система',
    image: atlasCrmImage,
    description:
      'CRM нового поколения для глобального отдела продаж: воронка сделок, аналитика и карточки клиентов в едином интерфейсе.',
    tags: ['UX/UI-дизайн', 'Веб-сервис', 'Аналитика'],
  },
  {
    label: 'Nexora',
    type: 'Мобильное приложение',
    image: nexoraImage,
    description:
      'Финансовое приложение для международных пользователей: мультивалютные счета, аналитика расходов и рейтинг финансового здоровья.',
    tags: ['UX/UI-дизайн', 'iOS и Android', 'Fintech'],
  },
  {
    label: 'Pulsebot',
    type: 'Чат-бот',
    image: pulsebotImage,
    description:
      'AI-бот для D2C бренда: консультирует клиентов, подбирает товары и доводит до покупки в любом часовом поясе.',
    tags: ['Боты', 'AI', 'Автоматизация'],
  },
  {
    label: 'Bazaar Mini',
    type: 'Telegram Mini App',
    image: bazaarMiniImage,
    description:
      'Мини-приложение маркетплейса внутри Telegram: каталог, встроенный кошелёк и оплата без перехода на внешний сайт.',
    tags: ['Мини-приложения', 'Telegram', 'E-commerce'],
  },
];
