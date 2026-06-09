// modules/core/ui/modal/appModal.js

export function createAppModal() {
  const overlay = document.createElement('div');
  overlay.className = 'app-modal-overlay';

  const modal = document.createElement('div');
  modal.className = 'app-modal';

  const header = document.createElement('div');
  header.className = 'app-modal__header';

  const title = document.createElement('div');
  title.className = 'app-modal__title';

  const closeBtn = document.createElement('button');
  closeBtn.className = 'app-modal__close';
  closeBtn.textContent = '✕';

  const body = document.createElement('div');
  body.className = 'app-modal__body';

  header.appendChild(title);
  header.appendChild(closeBtn);

  modal.appendChild(header);
  modal.appendChild(body);

  overlay.appendChild(modal);

  let isOpen = false;

  function open({ title: t = '', content = null }) {
    title.textContent = t;

    body.innerHTML = '';

    if (content instanceof HTMLElement) {
      body.appendChild(content);
    }

    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
      overlay.classList.add('is-open');
    });

    isOpen = true;
  }

  function close() {
    overlay.classList.remove('is-open');

    setTimeout(() => {
      overlay.remove();
      body.innerHTML = '';
      isOpen = false;
    }, 150);
  }

  closeBtn.onclick = close;

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  return {
    open,
    close,
    isOpen,
  };
}