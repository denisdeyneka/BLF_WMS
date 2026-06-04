// ==============================
// PRODUCT LIBRARY UI (FINAL CLEAN VERSION)
// ==============================

export function renderProductLibrary(api) {

    const categoryMap = {
        lz: 'Лікарський засіб',
        md: 'Медичний виріб',
        vet: 'Ветеринарний препарат',
        diet: 'Дієтична добавка / вода',
        cosmetic: 'Косметичний засіб',
        other: 'Інше'
    };

    const storageZoneMap = {
        A: '+2...+8°C',
        B: '15...25°C RH<65%',
        C: '-20...-10°C',
        NA: 'Н/З'
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
            <h3 id="dTitle">Продукт</h3>
            <!-- 1 -->
            <div class="field">
                <label for="name">Назва</label>
                <input id="name" />
            </div>

            <!-- 2 -->
            <div class="field">
                <label for="description">Опис</label>
                <textarea id="description"></textarea>
            </div>

            <!-- 3 -->
            <div class="form-row form-row--2">

                <div class="field col">
                    <label for="code">Код виробу</label>
                    <input id="code" />
                </div>

                <div class="field col">
                    <label for="category">Категорія</label>
                    <select id="category">
                        <option value="">Оберіть категрію</option>
                        <option value="lz">Лікарський засіб</option>
                        <option value="md">Медичний виріб</option>
                        <option value="vet">Ветеринарний препарат</option>
                        <option value="diet">Дієтична добавка/вода</option>
                        <option value="cosmetic">Косметичний засіб</option>
                        <option value="other">Інше</option>
                    </select>
                </div>

            </div>

            <!-- 4 -->
            <div class="form-row form-row--3">

                <div class="field col">
                    <label for="primary_packaging">Первинна упак</label>
                    <input id="primary_packaging" />
                </div>

                <div class="field col">
                    <label for="fill_volume">Обʼєм (ml)</label>
                    <input id="fill_volume" type="number" />
                </div>

                <div class="field col">
                    <label for="fill_dose">Доза</label>
                    <input id="fill_dose" type="number" />
                </div>

            </div>

            <!-- 5 -->
            <div class="form-row form-row--2">

                <div class="field col">
                    <label for="units_per_pack">Одиниць в упаковці</label>
                    <input id="units_per_pack" type="number" />
                </div>

                <div class="field col">
                    <label for="packs_per_box">Упаковок у коробці</label>
                    <input id="packs_per_box" type="number" />
                </div>

            </div>

            <!-- 6 -->
            <div class="form-row form-row--2">

                <div class="field col">
                    <label for="storage_zone">Зона зберігання</label>
                    <select id="storage_zone">
                        <option value="">Оберіть зону</option>
                        <option value="A">+2...+8°C</option>
                        <option value="B">+15...+25°C</option>
                        <option value="C">-20...-10°C</option>
                        <option value="NA">Н/З</option>
                    </select>
                </div>

                <div class="field col">
                    <label for="shelf_life">Термін придатності (міс)</label>
                    <input id="shelf_life" type="number" />
                </div>

            </div>

            <!-- 7 -->
            <div class="field">
                <label for="registration_certificate">Нормативний документ</label>
                <input id="registration_certificate" />
            </div>

            <!-- 8 -->
            <div class="field">
                <label for="country">Країна</label>
                <input id="country" />
            </div>

            <div id="errors" class="form-errors"></div>

            <div class="product-drawer__actions">
                 
                    <button id="save" class="btn btn--primary">ЗБЕРЕГТИ</button>
                    <button id="cancel" class="btn">Скасувати</button>
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
        fill_dose: $('#fill_dose'),
        units_per_pack: $('#units_per_pack'),
        packs_per_box: $('#packs_per_box'),
        storage_zone: $('#storage_zone'),
        country: $('#country')
    };

    const dTitle = $('#dTitle');

    // =========================
    // BUILDERS
    // =========================

    function buildCharacteristics(p) {
        const parts = [];

        if (p.primary_packaging) parts.push(p.primary_packaging);
        if (p.fill_volume) parts.push(`${p.fill_volume} ml`);
        if (p.fill_dose) parts.push(p.fill_dose);

        return parts.join(' / ');
    }

    function buildPackaging(p) {
        const u = p.units_per_pack ? `${p.units_per_pack} шт в упак.` : '';
        const b = p.packs_per_box ? `${p.packs_per_box} упак. в кор.` : '';

        if (u && b) return `${u} / ${b}`;
        return u || b || '';
    }

    function buildDisplayName(data) {
        return `${data.name || ''} ${data.fill_volume || ''}ml / ${data.fill_dose || ''}`;
    }

    // =========================
    // OPEN
    // =========================
    function open(product = null) {

        drawer.classList.add('product-drawer--open');

        const inner = drawer.querySelector('.product-drawer__inner');
        inner.scrollTop = 0;

        // =========================
        // CREATE MODE
        // =========================
        if (!product) {
            dTitle.textContent = 'Створити продукт';
            editId = null;

            Object.values(fields).forEach(f => f.value = '');

            fields.country.value = 'Україна';

            return;
        }

        // =========================
        // EDIT MODE (FIXED SAFE FILL)
        // =========================
        dTitle.textContent = 'Змінити продукт';
        editId = product.id;

        // 🔥 защита от "пустого/урезанного" объекта
        const p = product || {};

        fields.code.value = p.code || '';
        fields.name.value = p.name || '';
        fields.description.value = p.description || '';
        fields.category.value = p.category || '';

        fields.primary_packaging.value = p.primary_packaging || '';
        fields.fill_volume.value = p.fill_volume || '';
        fields.fill_dose.value = p.fill_dose || '';

        fields.units_per_pack.value = p.units_per_pack || '';
        fields.packs_per_box.value = p.packs_per_box || '';

        fields.storage_zone.value = p.storage_zone || '';
        fields.country.value = p.country || 'Україна';
    }

    function close() {
        drawer.classList.remove('product-drawer--open');
    }

    // =========================
    // SAVE
    // =========================
    async function save() {

        const data = {};

        Object.keys(fields).forEach(k => {
            data[k] = fields[k].value.trim();
        });

        const errors = validate(data);
        const errorBox = drawer.querySelector('#errors');

        errorBox.innerHTML = '';

        if (errors.length) {
            errorBox.innerHTML = errors.map(e => `<div>${e}</div>`).join('');
            return;
        }

        data.display_name = buildDisplayName(data);

        if (editId) {
            await api.updateProduct(editId, data);
        } else {
            await api.createProduct(data);
        }

        close();
        await load();
    }

    // =========================
    // LOAD TABLE
    // =========================
    async function load() {

        const products = await api.getProducts();

        table.innerHTML = `
            <tr>
                <th>Код</th>
                <th>Назва / Опис</th>
                <th>Характеристика</th>
                <th>Фасування</th>
                <th>Країна</th>
                <th>Зона</th>
                <th>Дії</th>
            </tr>
        `;

        products.forEach(p => {

            const row = document.createElement('tr');

            const tdCode = document.createElement('td');
            tdCode.textContent = p.code || '';
            tdCode.className = 'col-code';

            const tdName = document.createElement('td');
            tdName.className = 'col-name';

            const name = document.createElement('div');
            name.textContent = p.name || '';
            name.style.fontWeight = '600';

            const desc = document.createElement('div');
            desc.textContent = p.description || '';
            desc.style.fontSize = '12px';
            desc.style.opacity = '0.7';

            tdName.appendChild(name);
            tdName.appendChild(desc);

            const tdChar = document.createElement('td');
            tdChar.className = 'col-char';
            tdChar.textContent = buildCharacteristics(p);

            const tdPack = document.createElement('td');
            tdPack.className = 'col-pack';
            tdPack.textContent = buildPackaging(p);

            const tdCountry = document.createElement('td');
            tdCountry.className = 'col-country';
            tdCountry.textContent = p.country || '';

            const tdZone = document.createElement('td');
            tdZone.className = 'col-zone';
            tdZone.textContent =
                storageZoneMap[p.storage_zone] || p.storage_zone || '';

            const tdActions = document.createElement('td');
            tdActions.className = 'col-actions';
            tdActions.className = 'col-actions';

            const wrapper = document.createElement('div');
            wrapper.className = 'actions-wrapper';

            const edit = document.createElement('button');
            edit.textContent = 'Змінити';
            edit.className = 'btn btn--small btn--edit';
            edit.onclick = () => {
            console.log('PRODUCT FROM TABLE:', p);
            open(p);
        };

            const del = document.createElement('button');
            del.textContent = 'Видалити';
            del.className = 'btn btn--small btn--danger';
            del.onclick = async () => {
                await api.deleteProduct(p.id);
                await load();
            };

            wrapper.appendChild(edit);
            wrapper.appendChild(del);
            tdActions.appendChild(wrapper);

            row.appendChild(tdCode);
            row.appendChild(tdName);
            row.appendChild(tdChar);
            row.appendChild(tdPack);
            row.appendChild(tdCountry);
            row.appendChild(tdZone);
            row.appendChild(tdActions);

            table.appendChild(row);
        });
    }

    // =========================
    // VALIDATION
    // =========================
    function validate(data) {
        const errors = [];

        if (!data.code) errors.push('Code required');
        if (!data.name) errors.push('Name required');
        if (!data.category) errors.push('Category required');
        if (!data.fill_volume) errors.push('Fill volume required');
        if (!data.units_per_pack) errors.push('Units per pack required');

        return errors;
    }

    // =========================
    // EVENTS
    // =========================
    addBtn.onclick = () => open();
    drawer.querySelector('#save').onclick = save;
    drawer.querySelector('#cancel').onclick = close;

    load();

    return container;
}