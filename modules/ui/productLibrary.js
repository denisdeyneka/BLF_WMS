// ==============================
// PRODUCT LIBRARY UI (STABLE VERSION)
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
    // FORM STATE (future-ready)
    // =========================
    let editMode = false;
    let editId = null;

    // =========================
    // FORM
    // =========================
    const form = document.createElement('div');
    form.style.marginBottom = '20px';

    form.innerHTML = `
        <input id="name" placeholder="Product name" />
        <input id="desc" placeholder="Description" />
        <button id="addBtn">Add</button>
        <button id="cancelBtn" style="display:none;">Cancel</button>
    `;

    container.appendChild(form);

    const nameInput = form.querySelector('#name');
    const descInput = form.querySelector('#desc');
    const addBtn = form.querySelector('#addBtn');
    const cancelBtn = form.querySelector('#cancelBtn');

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

            // content
            const content = document.createElement('div');

            content.innerHTML = `
                <b>${p.product_name}</b><br/>
                <small>${p.description || ''}</small>
            `;

            row.appendChild(content);

            // =========================
            // ACTIONS
            // =========================
            const actions = document.createElement('div');
            actions.style.marginTop = '8px';

            // DELETE
            const delBtn = document.createElement('button');
            delBtn.textContent = 'Delete';

            delBtn.onclick = async () => {
                await api.deleteProduct(p.id);
                await load();
            };

            // EDIT (prepare)
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.style.marginLeft = '8px';

            editBtn.onclick = () => {

                editMode = true;
                editId = p.id;

                nameInput.value = p.product_name;
                descInput.value = p.description || '';

                addBtn.textContent = 'Update';
                cancelBtn.style.display = 'inline-block';
            };

            actions.appendChild(delBtn);
            actions.appendChild(editBtn);

            row.appendChild(actions);

            list.appendChild(row);
        });
    }

    // =========================
    // ADD / UPDATE PRODUCT
    // =========================
    addBtn.onclick = async () => {

        const product_name = nameInput.value.trim();
        const description = descInput.value.trim();

        if (!product_name) return;

        // =========================
        // CREATE
        // =========================
        if (!editMode) {

            await api.createProduct({
                product_name,
                description,
                form: '',
                dosage: '',
                packaging: '',
                shelf_life: ''
            });

        } else {

            // =========================
            // UPDATE
            // =========================
            await api.updateProduct(editId, {
                product_name,
                description,
                form: '',
                dosage: '',
                packaging: '',
                shelf_life: ''
            });

            editMode = false;
            editId = null;
        }

        // reset form
        nameInput.value = '';
        descInput.value = '';

        addBtn.textContent = 'Add';
        cancelBtn.style.display = 'none';

        setTimeout(load, 50);
    };

    // =========================
    // CANCEL EDIT
    // =========================
    cancelBtn.onclick = () => {

        editMode = false;
        editId = null;

        nameInput.value = '';
        descInput.value = '';

        addBtn.textContent = 'Add';
        cancelBtn.style.display = 'none';
    };

    // initial load
    load();

    return container;
}