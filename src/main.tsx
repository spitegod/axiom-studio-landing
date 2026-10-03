import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './styles/global.scss';
import App from './App.tsx';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Не найден элемент #root');
}

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
