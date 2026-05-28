export function createHeader(onViewChange) {

  const header = document.createElement('div');

  header.style.padding = '10px';
  header.style.borderBottom = '1px solid #ccc';
  header.style.display = 'flex';
  header.style.gap = '10px';

  // кнопки навигации
  const mapBtn = document.createElement('button');
  mapBtn.textContent = 'Map';

  const tableBtn = document.createElement('button');
  tableBtn.textContent = 'Table';

  mapBtn.onclick = () => onViewChange('map');
  tableBtn.onclick = () => onViewChange('table');

  header.appendChild(mapBtn);
  header.appendChild(tableBtn);

  return header;
}