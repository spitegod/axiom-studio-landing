import { useEffect } from 'react';
import { installYandexMetrika, isMetrikaEnabled, YANDEX_METRIKA_ID } from '../../data/analytics';

export function YandexMetrika() {
  useEffect(() => {
    installYandexMetrika(YANDEX_METRIKA_ID);
  }, []);

  if (!isMetrikaEnabled(YANDEX_METRIKA_ID)) return null;

  return (
    <noscript>
      <div>
        <img
          src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}`}
          alt=""
          style={{ position: 'absolute', left: '-9999px' }}
        />
      </div>
    </noscript>
  );
}
