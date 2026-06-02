import { renderProductLibrary } from './modules/ui/productLibrary.js';

console.log('APP START');

// очищаем body
document.body.innerHTML = '';

// контейнер приложения
const appContainer = document.createElement('div');

appContainer.id = 'app';

document.body.appendChild(appContainer);

// рендерим библиотеку препаратов
function render() {

    appContainer.innerHTML = '';

    appContainer.appendChild(
        renderProductLibrary(window.api)
    );
}

console.log(window.api);
render();