// ==============================
// PRODUCT LIBRARY UI (ERP v2)
// ==============================


export function renderProductLibrary(api) {

    const categoryMap = {
        lz: 'Лікарські засоби',
        md: 'мед. вироби',
        vet: 'Ветеринарні препарати',
        diet: 'Дієтичні добавки/вода',
        cosmetic: 'Косметичні засоби'
    };

  
    const container = document.createElement('div');
    container.className = 'product-library';

    // =========================
    // HEADER
    // =========================
    const header = document.createElement('div');
    header.className = 'product-header';

    const title = document.createElement('h2');
    title.textContent = 'Product Registry';

    const addBtn = document.createElement('button');
    addBtn.className = 'btn btn--primary';
    addBtn.textContent = '+ Add Product';

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

            <h3 id="dTitle">Product</h3>

            <input id="code" placeholder="Code" />
            <input id="name" placeholder="Name" />
            <textarea id="description" placeholder="Full description (regulatory text)"></textarea>
            <div id="errors" class="form-errors"></div>

            <select id="category">
                <option value="">Category</option>
                <option value="lz">ЛЗ</option>
                <option value="md">Мед. вироби</option>
                <option value="vet">Ветеринарні</option>
                <option value="diet">Дієтичні</option>
                <option value="cosmetic">Косметика</option>
            </select>

            <input id="primary_packaging" placeholder="Primary packaging" />
            <input id="fill_volume" placeholder="Fill volume" />

            <input id="group_packaging" placeholder="Group packaging (box)" />
            <input id="units_per_box" placeholder="Units per box" />

            <input id="shelf_life" placeholder="Shelf life" />
            <input id="storage_conditions" placeholder="Storage conditions" />

            <input id="registration_certificate" placeholder="Registration cert" />
            <input id="country" placeholder="Country" />

            <div class="product-drawer__actions">
                <button id="save" class="btn btn--primary">Save</button>
                <button id="cancel" class="btn">Cancel</button>
            </div>

        </div>
    `;

    container.appendChild(drawer);

    // =========================
    // STATE
    // =========================
    let editId = null;

    const $ = (id) => drawer.querySelector(id);

    const fields = {
        code: $('#code'),
        name: $('#name'),
        description: $('#description'),
        category: $('#category'),
        primary_packaging: $('#primary_packaging'),
        fill_volume: $('#fill_volume'),
        group_packaging: $('#group_packaging'),
        units_per_box: $('#units_per_box'),
        shelf_life: $('#shelf_life'),
        storage_conditions: $('#storage_conditions'),
        registration_certificate: $('#registration_certificate'),
        country: $('#country')
    };

    const dTitle = $('#dTitle');

    // =========================
    // DRAWER CONTROL
    // =========================
    function open(product = null) {

        drawer.classList.add('product-drawer--open');

        if (product) {
            dTitle.textContent = 'Edit Product';
            editId = product.id;

            fields.code.value = product.code || '';
            fields.name.value = product.name || '';
            fields.description.value = product.description || '';
            fields.category.value = product.category || '';

            fields.primary_packaging.value = product.primary_packaging || '';
            fields.fill_volume.value = product.fill_volume || '';
            fields.group_packaging.value = product.group_packaging || '';
            fields.units_per_box.value = product.units_per_box || '';

            fields.shelf_life.value = product.shelf_life || '';
            fields.storage_conditions.value = product.storage_conditions || '';

            fields.registration_certificate.value = product.registration_certificate || '';
            fields.country.value = product.country || '';

        } else {
            dTitle.textContent = 'New Product';
            editId = null;

            Object.values(fields).forEach(f => f.value = '');
        }
    }

    function close() {
        drawer.classList.remove('product-drawer--open');
    }

    // =========================
    // SAVE
    // =========================
async function save() {

    const data = {
        code: fields.code.value.trim(),
        name: fields.name.value.trim(),
        description: fields.description.value.trim(),
        category: fields.category.value,

        primary_packaging: fields.primary_packaging.value.trim(),
        fill_volume: fields.fill_volume.value.trim(),

        group_packaging: fields.group_packaging.value.trim(),
        units_per_box: fields.units_per_box.value.trim(),

        shelf_life: fields.shelf_life.value.trim(),
        storage_conditions: fields.storage_conditions.value.trim(),

        registration_certificate: fields.registration_certificate.value.trim(),
        country: fields.country.value.trim()
    };

    const errors = validate(data);

    const errorBox = drawer.querySelector('#errors');

    // очистка UI
    errorBox.innerHTML = '';
    Object.values(fields).forEach(f => f.classList.remove('input-error'));

    if (errors.length > 0) {

        errorBox.innerHTML = errors.map(e => `<div>${e}</div>`).join('');

        if (!data.code) fields.code.classList.add('input-error');
        if (!data.name || data.name.length < 2) fields.name.classList.add('input-error');
        if (!data.category) fields.category.classList.add('input-error');

        return;
    }

    if (editId) {
        await api.updateProduct(editId, data);
    } else {
        await api.createProduct(data);
    }

    close();
    await load();
}

    // =========================
    // TABLE LOAD
    // =========================
    async function load() {

        const products = await api.getProducts();

        table.innerHTML = `
            <tr>
                <th class="col-code">Код</th>
                <th>Назва</th>
                <th>Опис (повна назва)</th>
                <th class="col-category">Категорія</th>
                <th>Первинне пакування</th>
                <th class="col-actions">Дії</th>
            </tr>
        `;

        products.forEach(p => {

            const row = document.createElement('tr');

            const tdCode = document.createElement('td');
            tdCode.className = 'col-code';
            tdCode.textContent = p.code || '';

            const tdName = document.createElement('td');
            tdName.textContent = p.name || '';

            const tdDesc = document.createElement('td');
            tdDesc.className = 'col-description';
            tdDesc.textContent = p.description || '';

            const tdCat = document.createElement('td');
            tdCat.className = 'col-category';
            tdCat.textContent =
                categoryMap[(p.category || '').toLowerCase()] || p.category || '';

            const tdPack = document.createElement('td');
            tdPack.textContent = p.primary_packaging || '';

            const tdActions = document.createElement('td');
            tdActions.className = 'col-actions';

            const wrapper = document.createElement('div');
            wrapper.className = 'actions-wrapper';

            const edit = document.createElement('button');
            edit.textContent = 'Edit';
            edit.onclick = () => open(p);

            const del = document.createElement('button');
            del.textContent = 'Delete';
            del.onclick = async () => {
                await api.deleteProduct(p.id);
                await load();
            };

            wrapper.appendChild(edit);
            wrapper.appendChild(del);
            tdActions.appendChild(wrapper);

            row.appendChild(tdCode);
            row.appendChild(tdName);
            row.appendChild(tdDesc);
            row.appendChild(tdCat);
            row.appendChild(tdPack);
            row.appendChild(tdActions);

            table.appendChild(row);
        });


        console.log('PRODUCTS:', products);
    }

    // =========================
    // EVENTS
    // =========================
    addBtn.onclick = () => open();
    drawer.querySelector('#save').onclick = save;
    drawer.querySelector('#cancel').onclick = close;

    // =========================
    // VALIDATION
    // =========================

    function validate(data) {

    const errors = [];

    if (!data.code) {
        errors.push('Code is required');
    }

    if (!data.name || data.name.length < 2) {
        errors.push('Name must be at least 2 characters');
    }

    if (!data.category) {
        errors.push('Category is required');
    }

    return errors;
}

    // =========================
    // INIT
    // =========================
    load();

    return container;
}