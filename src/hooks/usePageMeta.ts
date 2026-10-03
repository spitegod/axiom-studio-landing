import { useEffect } from 'react';
import type { PageMeta } from '../seo/site';

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

/** В проде теги уже стоят в HTML. Хук нужен dev-серверу и совпадает с ними. */
export function usePageMeta(meta: PageMeta) {
  useEffect(() => {
    document.title = meta.title;
    setMeta('meta[name="description"]', 'name', 'description', meta.description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', meta.ogTitle);
    setMeta('meta[property="og:description"]', 'property', 'og:description', meta.ogDescription);
    setMeta('meta[property="og:url"]', 'property', 'og:url', meta.canonical);
    setMeta('meta[property="og:image:alt"]', 'property', 'og:image:alt', meta.imageAlt);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', meta.ogTitle);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', meta.ogDescription);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = meta.canonical;
  }, [meta]);
}
