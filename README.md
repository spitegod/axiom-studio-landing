# Axiom Studio

Лендинг венчурной студии [axiom-studio.ru](https://axiom-studio.ru/). Сайт на Vite и React, тексты на русском. Продакшен-сборка — статические HTML-файлы: каждый маршрут отдаётся без выполнения JavaScript, затем приложение гидрируется.

## Команды

```bash
npm install
npm run dev      # локальная разработка, http://localhost:5173
npm run build    # проверка типов, сборка и пререндер в dist/
npm run preview  # просмотр dist/
npm run lint
```

В режиме разработки Vite отдаёт одну оболочку на все пути, страницу рисует клиентский JavaScript. В `dist/` после сборки у каждого маршрута свой `index.html` с готовым текстом, `<title>`, description, canonical и Open Graph.

## Как устроен пререндер

Сборка идёт в три шага:

1. `vite build` собирает клиентский бандл в `dist/`.
2. `vite build --ssr src/entry-server.tsx` собирает серверный рендер во временный каталог `dist/server`.
3. `node scripts/prerender.mjs` вызывает `renderToString` для каждого маршрута, подставляет разметку и мета-теги в клиентский `index.html` и раскладывает файлы по папкам. Каталог `dist/server` после этого удаляется.

На выходе обычная статика:

- `/` → `dist/index.html`
- `/privacy` → `dist/privacy/index.html`
- остальные маршруты → `dist/<slug>/index.html`

Гидрирование (`hydrateRoot`) подхватывает уже нарисованный HTML. Анимации главной остаются на клиенте: до загрузки скрипта блоки с классом `reveal` не прячутся, а после гидрации `useScrollReveal` включает появление при прокрутке в том же кадре.

## Деплой

Корень сайта — содержимое `dist/`. Подойдёт nginx без отдельного Node-процесса:

```nginx
server {
    listen 80;
    server_name axiom-studio.ru;
    root /var/www/axiom-studio;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

`try_files` сначала ищет файл, затем каталог с `index.html`. Поэтому `/privacy` и `/privacy/` открывают `privacy/index.html`, а не главную. Неизвестный путь по-прежнему падает на `index.html` главной.

Рядом лежат `robots.txt` и `sitemap.xml`. В `robots.txt` открыт весь сайт и указана карта:

```
User-agent: *
Allow: /

Sitemap: https://axiom-studio.ru/sitemap.xml
```

Карта собирается при пререндере из того же списка маршрутов и перезаписывает копию из `public/`. Яндекс.Метрика подключается только если в `src/data/analytics.ts` задан `YANDEX_METRIKA_ID`. Пустой идентификатор в сниппет не подставляется.

## Маршруты

- `/` — главная
- `/privacy` — политика обработки персональных данных
- `/razrabotka-startapa-za-dolyu`
- `/mvp-za-procent-ot-vyruchki`
- `/razrabotka-telegram-mini-app`
- `/tehnicheskiy-partner-dlya-startapa`
- `/kak-zapustit-startap-bez-deneg-na-razrabotku`

Кластеры запросов для сверки в Вордстате — в `SEO_KEYWORDS.md`. Частотность в репозитории не указана.
