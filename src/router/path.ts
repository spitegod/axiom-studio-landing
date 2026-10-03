/** Путь без завершающего слэша. Корень остаётся «/». */
export function currentPath(): string {
  const path = window.location.pathname.replace(/\/+$/, '');
  return path === '' ? '/' : path;
}

export function isPrivacyPath(): boolean {
  return currentPath() === '/privacy';
}
