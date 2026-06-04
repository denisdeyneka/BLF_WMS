export function createFooter() {
  const footer = document.createElement('div');

  footer.id = 'footer-status';

  footer.style.padding = '8px';
  footer.style.borderTop = '1px solid #ccc';
  footer.style.fontSize = '12px';
  footer.style.color = '#555';

  footer.textContent = 'Status: ready';

  return footer;
}
