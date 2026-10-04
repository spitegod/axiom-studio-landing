import { useEffect } from 'react';
import { APPLY_HINT } from '../../data/contacts';
import {
  APPLY_LABEL,
  LANDINGS,
  type LandingPageData,
} from '../../data/landings';
import { canonicalUrl } from '../../seo/site';
import { STUDIO_NAME } from '../../data/contacts';
import { SITE_URL } from '../../data/privacy';
import { ApplyButton, Container, ManagerButton } from '../ui';
import { RichText } from './RichText';
import styles from './LandingPage.module.scss';

function jsonLd(page: LandingPageData) {
  const url = canonicalUrl(page.path);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: page.title,
        description: page.description,
        inLanguage: 'ru',
        isPartOf: {
          '@type': 'WebSite',
          name: STUDIO_NAME,
          url: SITE_URL,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Главная',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: page.h1,
            item: url,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: page.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    ],
  };
}

export function LandingPage({ page }: { page: LandingPageData }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page.path]);

  const related = LANDINGS.filter((item) => item.path !== page.path);
  const faqId = `${page.path.slice(1)}-faq`;
  const ctaId = `${page.path.slice(1)}-cta`;

  return (
    <article className={styles.page}>
      <Container>
        <div className={styles.sheet}>
          <nav className={styles.crumbs} aria-label="Хлебные крошки">
            <a href="/">Главная</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{page.footerLabel}</span>
          </nav>

          <header className={styles.intro}>
            <p className={styles.eyebrow}>{page.eyebrow}</p>
            <h1 className={styles.title}>{page.h1}</h1>
            <p className={styles.lead}>
              <RichText text={page.lead} className={styles.textLink} />
            </p>
            <div className={styles.actions}>
              <div className={styles.actionRow}>
                <ApplyButton source="final">{APPLY_LABEL}</ApplyButton>
                <ManagerButton variant="secondary" />
              </div>
              <p className={styles.hint}>{APPLY_HINT}</p>
            </div>
          </header>

          {page.sections.map((section) => (
            <section className={styles.section} id={section.id} key={section.id}>
              <h2 className={styles.heading}>{section.title}</h2>
              {section.paragraphs.map((paragraph, index) => (
                <p key={`${section.id}-${index}`}>
                  <RichText text={paragraph} className={styles.textLink} />
                </p>
              ))}
              {section.bullets && (
                <ul className={styles.list}>
                  {section.bullets.map((item) => (
                    <li key={item}>
                      <RichText text={item} className={styles.textLink} />
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </Container>

      <section className={styles.faq} aria-labelledby={faqId}>
        <Container>
          <div className={styles.sheet}>
            <h2 className={styles.heading} id={faqId}>
              {page.faqTitle}
            </h2>
            <div className={styles.faqList}>
              {page.faq.map((item) => (
                <div className={styles.faqItem} key={item.question}>
                  <h3 className={styles.question}>{item.question}</h3>
                  <p className={styles.answer}>{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <aside className={`${styles.sheet} ${styles.related}`} aria-label="Другие материалы">
          <h2 className={styles.heading}>Другие материалы</h2>
          <ul className={styles.relatedList}>
            <li>
              <a href="/">Главная страница</a>
              <p>Как устроено партнёрство: продукт, запуск и первые клиенты.</p>
            </li>
            {related.map((item) => (
              <li key={item.path}>
                <a href={item.path}>{item.h1}</a>
                <p>{item.summary}</p>
              </li>
            ))}
          </ul>
        </aside>
      </Container>

      <section className={styles.cta} aria-labelledby={ctaId}>
        <Container>
          <div className={styles.panel}>
            <div className={styles.glow} aria-hidden="true" />
            <div className={styles.panelBody}>
              <h2 className={styles.panelTitle} id={ctaId}>
                {page.ctaTitle}
              </h2>
              <p className={styles.panelText}>{page.ctaText}</p>
              <div className={styles.actionRow}>
                <ApplyButton source="final">{APPLY_LABEL}</ApplyButton>
                <ManagerButton variant="secondary-on-dark" />
              </div>
              <p className={styles.panelHint}>{APPLY_HINT}</p>
            </div>
          </div>
        </Container>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd(page)).replace(/</g, '\\u003c'),
        }}
      />
    </article>
  );
}
