// ==============================
// PRODUCT LIBRARY UI
// ==============================

export function renderProductLibrary(api) {

    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.fontFamily = 'Arial';

    // =========================
    // TITLE
    // =========================
    const title = document.createElement('h2');
    title.textContent = 'Product Library';
    container.appendChild(title);

    // =========================
    // FORM
    // =========================
    const form = document.createElement('div');
    form.style.marginBottom = '20px';

    form.innerHTML = `
        <input id="name" placeholder="Product name" />
        <input id="desc" placeholder="Description" />
        <button id="addBtn">Add</button>
    `;

    container.appendChild(form);

    // =========================
    // LIST
    // =========================
    const list = document.createElement('div');
    container.appendChild(list);

    // =========================
    // LOAD PRODUCTS
    // =========================
    async function load() {
        const products = await api.getProducts();

        list.innerHTML = '';

        if (!products || products.length === 0) {
            list.innerHTML = '<p>No products</p>';
            return;
        }

        products.forEach(p => {

            const row = document.createElement('div');

            row.style.border = '1px solid #ccc';
            row.style.padding = '10px';
            row.style.marginBottom = '8px';
            row.style.borderRadius = '6px';

            row.innerHTML = `
                <b>${p.product_name}</b><br/>
                <small>${p.description || ''}</small><br/>
            `;

            // delete button
            const btn = document.createElement('button');
            btn.textContent = 'Delete';

            btn.onclick = async () => {
                await api.deleteProduct(p.id);
                await load();
            };

            row.appendChild(btn);

            list.appendChild(row);
        });
    }

    // =========================
    // ADD PRODUCT
    // =========================
    form.querySelector('#addBtn').onclick = async () => {

        const name = form.querySelector('#name').value.trim();
        const desc = form.querySelector('#desc').value.trim();

        if (!name) return;

        await api.createProduct({
            product_name: name,
            description: desc,
            form: '',
            dosage: '',
            packaging: '',
            shelf_life: ''
        });

        form.querySelector('#name').value = '';
        form.querySelector('#desc').value = '';

        await load();
    };

    load();

    return container;
}