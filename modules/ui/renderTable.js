// ==========================
// UI: Warehouse Table View
// ==========================

export function renderTable(warehouse) {
  const container = document.createElement('div');
  container.style.marginTop = '20px';

  const title = document.createElement('h2');
  title.textContent = 'Warehouse table';
  container.appendChild(title);

  // таблица (простая DOM-таблица)
  const table = document.createElement('table');
  table.style.width = '100%';
  table.style.borderCollapse = 'collapse';

  // header
  const header = document.createElement('tr');

  ['Location', 'Product', 'Series', 'Qty'].forEach((h) => {
    const th = document.createElement('th');
    th.textContent = h;
    th.style.border = '1px solid #ccc';
    th.style.padding = '6px';

    header.appendChild(th);
  });

  table.appendChild(header);

  // data rows
  warehouse.zones.forEach((zone) => {
    zone.racks.forEach((rack) => {
      rack.locations.forEach((loc) => {
        if (!loc.stock || loc.stock.length === 0) return;

        loc.stock.forEach((item) => {
          const row = document.createElement('tr');

          const cells = [loc.id, item.productId, item.series, item.qty];

          cells.forEach((value) => {
            const td = document.createElement('td');
            td.textContent = value;
            td.style.border = '1px solid #ccc';
            td.style.padding = '6px';

            row.appendChild(td);
          });

          table.appendChild(row);
        });
      });
    });
  });

  container.appendChild(table);

  return container;
}
