// D:\my_projects\BLF_WMS\modules\ui\productlibrary\drawer.js

export function createDrawer({
  drawer,
  api,
  validateProduct,
  buildDisplayName,
}) {
  let editId = null;
  let originalData = null;

  const $ = (id) => drawer.querySelector(id);

  const fields = {
    code: $('#code'),
    name: $('#name'),
    description: $('#description'),
    category: $('#category'),
    primary_packaging: $('#primary_packaging'),
    fill_volume: $('#fill_volume'),
    fill_dose: $('#fill_dose'),
    units_per_pack: $('#units_per_pack'),
    packs_per_box: $('#packs_per_box'),
    storage_zone: $('#storage_zone'),
    country: $('#country'),
  };

  const dTitle = $('#dTitle');

  // =========================
  // CHANGE TRACKING
  // =========================
  function markChanges() {
    if (!originalData) return;

    Object.keys(fields).forEach((key) => {
      const input = fields[key];

      const original = originalData[key] ?? '';
      const current = input.value.trim();

      if (current !== String(original).trim()) {
        input.classList.add('is-changed');
      } else {
        input.classList.remove('is-changed');
      }
    });
  }

  Object.values(fields).forEach((input) => {
    input.addEventListener('input', markChanges);
  });

  // =========================
  // COLLECT DATA
  // =========================
  function collectData() {
    const data = {};

    Object.keys(fields).forEach((k) => {
      data[k] = fields[k].value.trim();
    });

    data.display_name = buildDisplayName(data);

    return data;
  }

  // =========================
  // OPEN
  // =========================
  function open(product = null) {
    drawer.classList.add('product-drawer--open');

    const inner = drawer.querySelector('.product-drawer__inner');
    inner.scrollTop = 0;

    const cloneBtn = drawer.querySelector('#saveAsNew');

    // reset styles
    Object.values(fields).forEach((input) => {
      input.classList.remove('is-changed');
    });

    originalData = null;
    editId = null;

    // =========================
    // CREATE MODE
    // =========================
    if (!product) {
      dTitle.textContent = 'Створити продукт';

      Object.values(fields).forEach((f) => (f.value = ''));
      fields.country.value = 'Україна';

      cloneBtn.style.display = 'none';
      return;
    }

    // =========================
    // EDIT MODE
    // =========================
    dTitle.textContent = 'Редагування';
    editId = product.id;

    cloneBtn.style.display = 'inline-flex';

    // IMPORTANT: snapshot for diff
    originalData = {
      code: product.code || '',
      name: product.name || '',
      description: product.description || '',
      category: product.category || '',
      primary_packaging: product.primary_packaging || '',
      fill_volume: product.fill_volume || '',
      fill_dose: product.fill_dose || '',
      units_per_pack: product.units_per_pack || '',
      packs_per_box: product.packs_per_box || '',
      storage_zone: product.storage_zone || '',
      country: product.country || '',
    };

    // fill form
    Object.keys(fields).forEach((k) => {
      fields[k].value = product[k] || '';
    });

    // run initial diff check
    setTimeout(markChanges, 0);
  }

  // =========================
  // CLOSE
  // =========================
 function close() {
  drawer.classList.remove('product-drawer--open');

  // 🔥 ВАЖНО: полностью отключаем клики
  drawer.style.pointerEvents = 'none';

  setTimeout(() => {
    drawer.style.pointerEvents = 'auto';
  }, 300);
}

  // =========================
  // SAVE
  // =========================
  async function save() {
    const data = collectData();
    const errors = validateProduct(data);

    const box = drawer.querySelector('#errors');
    box.innerHTML = '';

    if (errors.length) {
      box.innerHTML = errors.map((e) => `<div>${e}</div>`).join('');
      return;
    }

    if (editId) {
      // const ok = confirm('Зберегти зміни?');
      // if (!ok) return;

      await api.updateProduct(editId, data);
    } else {
      await api.createProduct(data);
    }

    close();
  }

  // =========================
  // SAVE AS NEW
  // =========================
  async function saveAsNew() {
    const data = collectData();

    // const ok = confirm('Створити новий продукт?');
    // if (!ok) return;

    delete data.id;

    await api.createProduct(data);

    close();
  }

  return { open, close, save, saveAsNew };
}