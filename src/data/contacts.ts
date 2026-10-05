// Единая точка правды для контактов и ссылок на заявку.

export const TELEGRAM_USERNAME = 'mgr_axiom_studio';

/** Личный чат менеджера. */
export const TELEGRAM_URL = `https://t.me/${TELEGRAM_USERNAME}`;

/** Подпись кнопки, которая открывает личный чат менеджера. */
export const MANAGER_LABEL = 'Связаться с менеджером';

export const STUDIO_EMAIL = 'axiom-studio@mail.ru';

export const STUDIO_NAME = 'Axiom Studio';

export const STUDIO_TAGLINE =
  'Строим стартапы за долю: продукт, запуск и первые клиенты.';

/** Бот студии: кнопка открывает его главное мини-приложение с анкетой. */
export const BOT_USERNAME = 'axiom_studio_bot';

/**
 * Все кнопки «Подать заявку» открывают мини-приложение с анкетой.
 * ?startapp= открывает Main Mini App бота и передаёт метку источника.
 */
export const APPLY_URL = `https://t.me/${BOT_USERNAME}?startapp=site`;

/**
 * Публичный Telegram-канал студии.
 * null — ссылку на канал нигде не показываем.
 */
export const CHANNEL_URL: string | null = 'https://t.me/axioma_community';

export const APPLY_HINT =
  '«Подать заявку» откроет короткую анкету в Telegram: четыре шага, меньше минуты.';

export type ApplySource = 'header' | 'hero' | 'final';

/**
 * Ссылка на заявку с меткой источника.
 * Для mini app (t.me/bot/app) и бота с ?start= / ?startapp= метка дописывается сама.
 * Для обычной ссылки на пользователя параметры не добавляем: Telegram не передаёт их в личный чат.
 */
export function applyLink(source: ApplySource): string {
  let url: URL;

  try {
    url = new URL(APPLY_URL);
  } catch {
    return APPLY_URL;
  }

  const parts = url.pathname.split('/').filter(Boolean);
  const isMiniApp = url.hostname === 't.me' && parts.length >= 2;

  if (isMiniApp) {
    url.searchParams.set('startapp', `site_${source}`);
    return url.toString();
  }

  if (url.searchParams.has('startapp')) {
    url.searchParams.set('startapp', `site_${source}`);
    return url.toString();
  }

  if (url.searchParams.has('start')) {
    url.searchParams.set('start', `site_${source}`);
    return url.toString();
  }

  return APPLY_URL;
}
