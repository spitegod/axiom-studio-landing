/**
 * Путь, с которым рендерит пререндер. На клиенте не используется:
 * там источник — адресная строка, иначе гидрация разойдётся с HTML.
 */
let ssrPath = '/';

export function setSsrPath(path: string) {
  ssrPath = normalizePath(path);
}

export function normalizePath(path: string): string {
  const trimmed = path.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

/** Путь без завершающего слэша. Корень остаётся «/». */
export function currentPath(): string {
  const raw = typeof window === 'undefined' ? ssrPath : window.location.pathname;
  return normalizePath(raw);
}

export function isPrivacyPath(): boolean {
  return currentPath() === '/privacy';
}
