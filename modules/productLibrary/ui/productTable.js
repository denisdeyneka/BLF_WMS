export function renderTable({
  table,
  products,
  categoryMap,
  storageZoneMap,
  buildCharacteristics,
  buildShortCharacteristics,
  drawerController,
  api,
  reload,
}) {
  table.innerHTML = '';

  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  const headerRow = document.createElement('tr');

  const headers = [
    'Код',
    'Категорія',
    'Назва / Опис',
    "Характеристики",
    'Фасування',
    'Країна',
    'Зона',
    'Дії',
  ];

  headers.forEach((h) => {
    const th = document.createElement('th');
    th.textContent = h;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);

  products.forEach((p) => {
    const row = document.createElement('tr');

    const tdCode = document.createElement('td');
    tdCode.textContent = p.code || '';

    const tdCategory = document.createElement('td');
    tdCategory.textContent = categoryMap[p.category] || '';

    const tdName = document.createElement('td');
    tdName.textContent = p.name || '';

    const tdChar = document.createElement('td');
    tdChar.textContent = buildShortCharacteristics(p);

    const tdPack = document.createElement('td');
    tdPack.textContent = buildCharacteristics(p);

    const tdCountry = document.createElement('td');
    tdCountry.textContent = p.country || '';

    const tdZone = document.createElement('td');
    tdZone.textContent = storageZoneMap[p.storage_zone] || '';

    const tdActions = document.createElement('td');

    const wrap = document.createElement('div');
    wrap.className = 'actions-wrapper';

    const edit = document.createElement('button');
    edit.className = 'btn btn--primary';
    edit.textContent = 'Змінити';
    edit.onclick = () => drawerController.open(p);

    const del = document.createElement('button');
    del.className = 'btn btn--danger';
    del.textContent = 'Видалити';

    del.onclick = async () => {
      // const ok = confirm(`Видалити ${p.name}?`);
      // if (!ok) return;

      await api.deleteProduct(p.id);
      await reload();
    };

    wrap.append(edit, del);
    tdActions.appendChild(wrap);

    row.append(tdCode, tdCategory, tdName, tdChar, tdPack, tdCountry, tdZone, tdActions);
    tbody.appendChild(row);
  });

  table.append(thead, tbody);
}