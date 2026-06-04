import { renderProductLibrary } from './modules/ui/productLibrary.js';
import { renderWarehouse } from './modules/ui/renderWarehouse.js';

console.log('APP START');

const content = document.getElementById('content');

const btnProducts = document.getElementById('nav-products');
const btnWarehouse = document.getElementById('nav-warehouse');

const api = window.api;

let currentView = 'products';

async function render() {
  content.innerHTML = '';

  if (currentView === 'products') {
    content.appendChild(renderProductLibrary(api));
  }

  if (currentView === 'warehouse') {
    // ВРЕМЕННО: пока нет API warehouse
    const warehouse = (await api.getWarehouse?.()) || { zones: [] };
    content.appendChild(renderWarehouse(warehouse));
  }
}

btnProducts.onclick = () => {
  currentView = 'products';
  render();
};

btnWarehouse.onclick = () => {
  currentView = 'warehouse';
  render();
};

render();
