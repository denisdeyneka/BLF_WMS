import { createHeader } from './header.js';
import { createFooter } from './footer.js';

export function createShell(onViewChange) {

  // главный контейнер приложения
  const app = document.createElement('div');

  // HEADER
  const header = createHeader(onViewChange);

  // MAIN (сюда будут рендериться Map/Table)
  const main = document.createElement('div');
  main.id = 'app';
  main.style.padding = '10px';

  // FOOTER
  const footer = createFooter();

  app.appendChild(header);
  app.appendChild(main);
  app.appendChild(footer);

  return app;
}