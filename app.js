import warehouse from './modules/data/warehouse.js';

import { renderWarehouse } from './modules/ui/renderWarehouse.js';
import { renderTable } from './modules/ui/renderTable.js';
import { createShell } from './modules/ui/layout/shell.js';

console.log('APP START');

let currentView = 'products';
if (currentView === 'products') {
    appContainer.appendChild(renderProductLibrary(window.api));
}

console.log('API test:', window.api.ping());
window.api.getProducts().then(console.log);



// контейнер куда монтируем всё приложение
document.body.innerHTML = '';

// состояние текущего вида
let currentView = 'map';

// создаём shell
const appShell = createShell(handleViewChange);
document.body.appendChild(appShell);

// контейнер контента
const appContainer = document.getElementById('app');

// рендер
function render() {

  appContainer.innerHTML = '';

  if (currentView === 'map') {
    appContainer.appendChild(renderWarehouse(warehouse));
  }

  if (currentView === 'table') {
    appContainer.appendChild(renderTable(warehouse));
  }
}

// обработка переключения
function handleViewChange(view) {
  currentView = view;
  render();
}

// первый запуск
render();