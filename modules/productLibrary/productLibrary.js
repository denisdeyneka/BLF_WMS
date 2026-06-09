// D:\my_projects\BLF_WMS\modules\productLibrary\productLibrary.js

import {
  categoryMap,
  storageZoneMap,
  buildCharacteristics,
  buildShortCharacteristics,
  buildDisplayName,
} from './logic/productHelpers.js';

import { validateProduct } from './logic/productValidation.js';
import { renderTable } from './ui/productTable.js';
import { createAppModal } from '../core/ui/modal/appModal.js';

export function renderProductLibrary(api) {
  const container = document.createElement('div');
  container.className = 'product-library';

  // =========================
  // MODAL (GLOBAL UI)
  // =========================
  const modal = createAppModal();

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
  // FORM STATE
  // =========================
  let formEl = null;
  let editId = null;

  function createForm(product = null) {
    const wrapper = document.createElement('div');

    wrapper.innerHTML = `
      <div class="product-form">

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

        <div class="product-form__actions">
          <button id="save" class="btn btn--primary">ЗБЕРЕГТИ</button>
          <button id="cancel" class="btn btn--danger">СКАСУВАТИ</button>
        </div>

      </div>
    `;

    const root = wrapper.firstElementChild;

    const fields = {
      code: root.querySelector('#code'),
      name: root.querySelector('#name'),
      description: root.querySelector('#description'),
      category: root.querySelector('#category'),
      primary_packaging: root.querySelector('#primary_packaging'),
      fill_volume: root.querySelector('#fill_volume'),
      fill_dose: root.querySelector('#fill_dose'),
      units_per_pack: root.querySelector('#units_per_pack'),
      packs_per_box: root.querySelector('#packs_per_box'),
      storage_zone: root.querySelector('#storage_zone'),
      country: root.querySelector('#country'),
    };

    function fill(data = {}) {
      Object.keys(fields).forEach((k) => {
        fields[k].value = data[k] || '';
      });
    }

    function collect() {
      const data = {};
      Object.keys(fields).forEach((k) => {
        data[k] = fields[k].value.trim();
      });

      data.display_name = buildDisplayName(data);
      return data;
    }

    // init values
    if (product) {
      editId = product.id;
      fill(product);
    } else {
      editId = null;
      fill();
      fields.country.value = 'Україна';
    }

    // events
    root.querySelector('#cancel').onclick = () => {
      modal.close();
    };

    root.querySelector('#save').onclick = async () => {
      const data = collect();

      const errors = validateProduct(data);

      const box = root.querySelector('#errors');
      box.innerHTML = '';

      if (errors.length) {
        box.innerHTML = errors.map((e) => `<div>${e}</div>`).join('');
        return;
      }

      if (editId) {
        await api.updateProduct(editId, data);
      } else {
        await api.createProduct(data);
      }

      modal.close();
      await load();
    };

    return root;
  }

  // =========================
  // LOAD
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
      openEdit,
      api,
      reload: load,
    });
  }

  // =========================
  // OPEN MODAL
  // =========================
  function openCreate() {
    const form = createForm(null);

    modal.open({
      title: 'Створити продукт',
      content: form,
    });
  }

  function openEdit(product) {
    const form = createForm(product);

    modal.open({
      title: 'Редагування продукту',
      content: form,
    });
  }

  // =========================
  // EVENTS
  // =========================
  addBtn.onclick = openCreate;

  load();

  return container;
}