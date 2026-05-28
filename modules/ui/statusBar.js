// ==========================
// МОДУЛЬ: Status Bar
// ==========================

// Функция обновления статуса в UI
export function updateStatus(message) {
  // Ищем элемент статуса в DOM
  const statusEl = document.getElementById('status');

  // Если элемент не найден — выводим предупреждение
  if (!statusEl) {
    console.log('Status element not found');
    return;
  }
  
  // Обновляем текст статуса
  statusEl.textContent = message;
  
}