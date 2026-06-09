// // ==========================
// // UI: Warehouse (visual grid)
// // ==========================

// export function renderWarehouse(warehouse) {
//   const container = document.createElement('div');
//   container.style.marginTop = '20px';
//   container.style.fontFamily = 'Arial';

//   const title = document.createElement('h2');
//   title.textContent = 'Warehouse map';
//   container.appendChild(title);

//   // ===== ZONES =====
//   warehouse.zones.forEach((zone) => {
//     const zoneBlock = document.createElement('div');

//     // визуальный блок зоны
//     zoneBlock.style.margin = '15px 0';
//     zoneBlock.style.padding = '10px';
//     zoneBlock.style.border = '2px solid #444';
//     zoneBlock.style.borderRadius = '8px';
//     zoneBlock.style.background = '#f9f9f9';

//     const zoneTitle = document.createElement('div');
//     zoneTitle.textContent = `ZONE ${zone.zoneId}`;
//     zoneTitle.style.fontWeight = 'bold';
//     zoneTitle.style.marginBottom = '10px';

//     zoneBlock.appendChild(zoneTitle);

//     // ===== RACKS =====
//     zone.racks.forEach((rack) => {
//       const rackBlock = document.createElement('div');
//       rackBlock.style.marginBottom = '10px';

//       const rackTitle = document.createElement('div');
//       rackTitle.textContent = `Rack ${zone.zoneId}-${rack.rackId}`;
//       rackTitle.style.fontSize = '12px';
//       rackTitle.style.color = '#555';

//       rackBlock.appendChild(rackTitle);

//       // ===== LOCATIONS GRID =====
//       const locGrid = document.createElement('div');

//       locGrid.style.display = 'flex';
//       locGrid.style.gap = '8px';
//       locGrid.style.flexWrap = 'wrap';
//       locGrid.style.marginTop = '5px';

//       rack.locations.forEach((loc) => {
//         const cell = document.createElement('div');

//         // базовый стиль ячейки
//         cell.style.width = '120px';
//         cell.style.padding = '8px';
//         cell.style.border = '1px solid #ccc';
//         cell.style.borderRadius = '6px';
//         cell.style.fontSize = '12px';
//         cell.style.background = '#fff';

//         // ID локации
//         const id = document.createElement('div');
//         id.textContent = loc.id;
//         id.style.fontWeight = 'bold';

//         cell.appendChild(id);

//         // STOCK
//         if (!loc.stock || loc.stock.length === 0) {
//           cell.style.opacity = '0.5';

//           const empty = document.createElement('div');
//           empty.textContent = 'empty';
//           empty.style.fontSize = '11px';

//           cell.appendChild(empty);
//         } else {
//           // есть товар → выделяем цветом
//           cell.style.border = '1px solid #2e7d32';
//           cell.style.background = '#e8f5e9';

//           loc.stock.forEach((item) => {
//             const line = document.createElement('div');

//             line.textContent = `${item.productId} | ${item.series} | ${item.qty}`;

//             line.style.fontSize = '11px';

//             cell.appendChild(line);
//           });
//         }

//         locGrid.appendChild(cell);
//       });

//       rackBlock.appendChild(locGrid);
//       zoneBlock.appendChild(rackBlock);
//     });

//     container.appendChild(zoneBlock);
//   });

//   return container;
// }
