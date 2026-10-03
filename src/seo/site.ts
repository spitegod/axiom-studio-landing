import { LANDINGS, type LandingPageData } from '../data/landings';
import { STUDIO_NAME } from '../data/contacts';
import { PRIVACY_PATH, PRIVACY_TITLE, SITE_URL } from '../data/privacy';

export const HOME_TITLE = 'Axiom Studio — венчурная студия: строим стартапы за долю';

export const HOME_DESCRIPTION =
  'Строим продукт, запускаем и приводим первых клиентов в обмен на долю в стартапе или процент выручки — без оплаты за разработку. Ищем основателей со знанием рынка.';

export const HOME_IMAGE_ALT = 'Axiom Studio — строим ваш стартап за долю, а не за деньги';

export interface PageMeta {
  path: string;
  title: string;
  description: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  imageAlt: string;
  jsonLd?: unknown;
}

export function canonicalUrl(path: string): string {
  if (path === '/') return SITE_URL;
  return `${SITE_URL.replace(/\/$/, '')}${path}`;
}

export const HOME_META: PageMeta = {
  path: '/',
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  canonical: canonicalUrl('/'),
  ogTitle: HOME_TITLE,
  ogDescription: HOME_DESCRIPTION,
  imageAlt: HOME_IMAGE_ALT,
};

const PRIVACY_DESCRIPTION =
  'Как Axiom Studio обрабатывает персональные данные посетителей сайта и людей, которые оставляют заявку. Редакция политики и текст согласия.';

export const PRIVACY_META: PageMeta = {
  path: PRIVACY_PATH,
  title: `${PRIVACY_TITLE} — ${STUDIO_NAME}`,
  description: PRIVACY_DESCRIPTION,
  canonical: canonicalUrl(PRIVACY_PATH),
  ogTitle: `${PRIVACY_TITLE} — ${STUDIO_NAME}`,
  ogDescription: PRIVACY_DESCRIPTION,
  imageAlt: `${PRIVACY_TITLE} — ${STUDIO_NAME}`,
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${PRIVACY_TITLE} — ${STUDIO_NAME}`,
    url: canonicalUrl(PRIVACY_PATH),
    description: PRIVACY_DESCRIPTION,
    inLanguage: 'ru',
    isPartOf: {
      '@type': 'WebSite',
      name: STUDIO_NAME,
      url: SITE_URL,
    },
  },
};

function landingMeta(page: LandingPageData): PageMeta {
  return {
    path: page.path,
    title: page.title,
    description: page.description,
    canonical: canonicalUrl(page.path),
    ogTitle: page.title,
    ogDescription: page.description,
    imageAlt: page.h1,
  };
}

const META_BY_PATH = new Map<string, PageMeta>([
  [HOME_META.path, HOME_META],
  [PRIVACY_META.path, PRIVACY_META],
  ...LANDINGS.map((page) => [page.path, landingMeta(page)] as const),
]);

export function metaForPath(path: string): PageMeta {
  return META_BY_PATH.get(path) ?? HOME_META;
}

export interface PrerenderRoute {
  path: string;
  loc: string;
}

export const PRERENDER_ROUTES: PrerenderRoute[] = [...META_BY_PATH.values()].map((meta) => ({
  path: meta.path,
  loc: meta.canonical,
}));

function escAttr(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function escText(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

export function renderSeoBlock(meta: PageMeta): string {
  const jsonLd = meta.jsonLd
    ? `\n    <script type="application/ld+json">${JSON.stringify(meta.jsonLd).replace(/</g, '\\u003c')}</script>`
    : '';

  return `    <meta name="description" content="${escAttr(meta.description)}" />
    <link rel="canonical" href="${escAttr(meta.canonical)}" />
    <meta property="og:title" content="${escAttr(meta.ogTitle)}" />
    <meta property="og:description" content="${escAttr(meta.ogDescription)}" />
    <meta property="og:url" content="${escAttr(meta.canonical)}" />
    <meta property="og:image:alt" content="${escAttr(meta.imageAlt)}" />
    <meta name="twitter:title" content="${escAttr(meta.ogTitle)}" />
    <meta name="twitter:description" content="${escAttr(meta.ogDescription)}" />
    <title>${escText(meta.title)}</title>${jsonLd}`;
}
