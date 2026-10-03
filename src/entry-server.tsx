// Серверный вход пререндера, не компонент приложения.
// oxlint-disable react/only-export-components
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { assertLandingCopy } from './data/landings';
import { setSsrPath, normalizePath } from './router/path';
import { PRERENDER_ROUTES, metaForPath, renderSeoBlock } from './seo/site';

export function render(url: string) {
  assertLandingCopy();
  const path = normalizePath(url.startsWith('/') ? url : `/${url}`);
  setSsrPath(path);

  const html = renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );

  return {
    html,
    head: renderSeoBlock(metaForPath(path)),
  };
}

export { PRERENDER_ROUTES };
