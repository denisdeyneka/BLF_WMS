// ==============================
// PRODUCT LIBRARY UI (CLEAN SCSS VERSION)
// ==============================

export function renderProductLibrary(api) {

    const container = document.createElement('div');
    container.className = 'product-library';

    // =========================
    // HEADER
    // =========================
    const header = document.createElement('div');
    header.className = 'product-header';

    const title = document.createElement('h2');
    title.textContent = 'Product Library';

    const addBtn = document.createElement('button');
    addBtn.className = 'btn btn--primary';
    addBtn.textContent = '+ Add Product';

    header.appendChild(title);
    header.appendChild(addBtn);

    container.appendChild(header);

    // =========================
    // BODY WRAP
    // =========================
    const body = document.createElement('div');
    body.className = 'product-body';

    // =========================
    // TABLE
    // =========================
    const tableWrap = document.createElement('div');
    tableWrap.className = 'product-table-wrap';

    const table = document.createElement('table');
    table.className = 'product-table';

    tableWrap.appendChild(table);

    // =========================
    // DRAWER
    // =========================
    const drawer = document.createElement('div');
    drawer.className = 'product-drawer';

    drawer.innerHTML = `
        <div class="product-drawer__inner">

            <h3 id="dTitle">Product</h3>

            <input id="name" placeholder="Name" />
            <input id="desc" placeholder="Description" />
            <input id="form" placeholder="Form" />
            <input id="dosage" placeholder="Dosage" />
            <input id="pack" placeholder="Packaging" />
            <input id="storage" placeholder="Storage" />
            <input id="shelf" placeholder="Shelf life" />

            <div class="product-drawer__actions">
                <button id="save" class="btn btn--primary">Save</button>
                <button id="cancel" class="btn">Cancel</button>
            </div>

        </div>
    `;

    body.appendChild(tableWrap);
    body.appendChild(drawer);
    container.appendChild(body);

    // =========================
    // STATE
    // =========================
    let editId = null;

    const $ = (sel) => drawer.querySelector(sel);

    const dTitle = $('#dTitle');

    const fields = {
        name: $('#name'),
        desc: $('#desc'),
        form: $('#form'),
        dosage: $('#dosage'),
        pack: $('#pack'),
        storage: $('#storage'),
        shelf: $('#shelf')
    };

    // =========================
    // DRAWER CONTROL
    // =========================
    function openDrawer(product = null) {

        drawer.classList.add('product-drawer--open');

        if (product) {
            dTitle.textContent = 'Edit Product';
            editId = product.id;

            fields.name.value = product.product_name || '';
            fields.desc.value = product.description || '';
            fields.form.value = product.form || '';
            fields.dosage.value = product.dosage || '';
            fields.pack.value = product.packaging || '';
            fields.storage.value = product.storage_conditions || '';
            fields.shelf.value = product.shelf_life || '';
        } else {
            dTitle.textContent = 'New Product';
            editId = null;

            Object.values(fields).forEach(f => f.value = '');
        }
    }

    function closeDrawer() {
        drawer.classList.remove('product-drawer--open');
    }

    // =========================
    // SAVE
    // =========================
    async function save() {

        const data = {
            product_name: fields.name.value.trim(),
            description: fields.desc.value.trim(),
            form: fields.form.value.trim(),
            dosage: fields.dosage.value.trim(),
            packaging: fields.pack.value.trim(),
            storage_conditions: fields.storage.value.trim(),
            shelf_life: fields.shelf.value.trim()
        };

        if (!data.product_name) return;

        if (editId) {
            await api.updateProduct(editId, data);
        } else {
            await api.createProduct(data);
        }

        closeDrawer();
        await load();
    }

    // =========================
    // TABLE LOAD
    // =========================
    async function load() {

        const products = await api.getProducts();

        table.innerHTML = `
            <tr class="product-table__header">
                <th>Name</th>
                <th>Form</th>
                <th>Dosage</th>
                <th>Packaging</th>
                <th>Actions</th>
            </tr>
        `;

        products.forEach(p => {

            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${p.product_name}</td>
                <td>${p.form || ''}</td>
                <td>${p.dosage || ''}</td>
                <td>${p.packaging || ''}</td>
                <td></td>
            `;

            const actions = row.querySelector('td:last-child');

            const edit = document.createElement('button');
            edit.className = 'btn';
            edit.textContent = 'Edit';
            edit.onclick = () => openDrawer(p);

            const del = document.createElement('button');
            del.className = 'btn btn--danger';
            del.textContent = 'Delete';

            del.onclick = async () => {
                await api.deleteProduct(p.id);
                await load();
            };

            actions.appendChild(edit);
            actions.appendChild(del);

            table.appendChild(row);
        });
    }

    // =========================
    // EVENTS
    // =========================
    addBtn.onclick = () => openDrawer();
    drawer.querySelector('#save').onclick = save;
    drawer.querySelector('#cancel').onclick = closeDrawer;

    // =========================
    // INIT
    // =========================
    load();

    return container;
}