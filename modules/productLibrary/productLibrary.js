import {
  categoryMap,
  storageZoneMap,
  buildCharacteristics,
  buildShortCharacteristics,
  buildDisplayName
} from './logic/productHelpers.js';

import { validateProduct } from './logic/productValidation.js';
import { renderTable } from './ui/productTable.js';
import { createDrawer } from './ui/productDrawer.js';

export function renderProductLibrary(api) {
  const container = document.createElement('div');
  container.className = 'product-library';

  // =========================
  // HEADER
  // =========================
  const header = document.createElement('div');
  header.className = 'product-header';

  const title = document.createElement('h2');
  title.textContent = 'Реєстр продукції';

  const addBtn = document.createElement('button');
  addBtn.className = 'btn btn--primary';
  addBtn.textContent = '+ Додати продукт';

  header.appendChild(title);
  header.appendChild(addBtn);
  container.appendChild(header);

  // =========================
  // TABLE
  // =========================
  const table = document.createElement('table');
  table.className = 'product-table';
  container.appendChild(table);

  // =========================
  // DRAWER
  // =========================
  const drawer = document.createElement('div');
  drawer.className = 'product-drawer';

  drawer.innerHTML = `
    <div class="product-drawer__inner">
      <h3 id="dTitle">Продукт</h3>

      <div class="field">
        <label>Назва</label>
        <input id="name"/>
      </div>

      <div class="field">
        <label>Опис</label>
        <textarea id="description"></textarea>
      </div>

      <div class="form-row form-row--2">
        <div class="field col">
          <label>Код</label>
          <input id="code"/>
        </div>

        <div class="field col">
          <label>Категорія</label>
          <select id="category">
            <option value="">Оберіть</option>
            <option value="lz">ЛЗ</option>
            <option value="md">МВ</option>
            <option value="vet">Вет</option>
            <option value="diet">Дієт</option>
            <option value="cosmetic">Косм</option>
            <option value="other">Інше</option>
          </select>
        </div>
      </div>

      <div class="form-row form-row--3">
        <div class="field col">
          <label>Упак</label>
          <input id="primary_packaging"/>
        </div>

        <div class="field col">
          <label>Об'єм</label>
          <input id="fill_volume"/>
        </div>

        <div class="field col">
          <label>Доза</label>
          <input id="fill_dose"/>
        </div>
      </div>

      <div class="form-row form-row--2">
        <div class="field col">
          <label>Шт/уп</label>
          <input id="units_per_pack"/>
        </div>

        <div class="field col">
          <label>Уп/кор</label>
          <input id="packs_per_box"/>
        </div>
      </div>

      <div class="form-row form-row--2">
        <div class="field col">
          <label>Зона</label>
          <select id="storage_zone">
            <option value="">Оберіть</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </div>

        <div class="field col">
          <label>Країна</label>
          <input id="country"/>
        </div>
      </div>

      <div id="errors" class="form-errors"></div>

      <div class="product-drawer__actions">
        <button id="save" class="btn btn--primary">ЗБЕРЕГТИ</button>
        <button id="saveAsNew" class="btn btn--warning">ЗБЕРЕГТИ ЯК НОВИЙ</button>
        <button id="cancel" class="btn btn--danger">СКАСУВАТИ</button>
      </div>
    </div>
  `;

  container.appendChild(drawer);

  // =========================
  // DRAWER CONTROLLER
  // =========================
  const drawerController = createDrawer({
    drawer,
    api,
    validateProduct,
    buildDisplayName,
    reload: load,
  });

  // =========================
  // LOAD TABLE
  // =========================
  async function load() {
    const products = await api.getProducts();

    renderTable({
      table,
      products,
      categoryMap,
      storageZoneMap,
      buildCharacteristics,
      buildShortCharacteristics,
      drawerController,
      api,
      reload: load,
    });
  }

  // =========================
  // EVENTS
  // =========================
  addBtn.onclick = () => drawerController.open();

  drawer.querySelector('#save').onclick = async () => {
    await drawerController.save();
    await load();
  };

  drawer.querySelector('#saveAsNew').onclick = async () => {
    await drawerController.saveAsNew();
    await load();
  };

  drawer.querySelector('#cancel').onclick = () => {
    drawerController.close();
  };

  load();

  return container;
}