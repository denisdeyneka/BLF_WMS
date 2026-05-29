// Подключаем Electron
// app - управляет жизненным циклом приложения
// BrowserWindow - создаёт окна приложения

const { initDB } = require('./modules/db/database.cjs');

initDB();


const { app, BrowserWindow } = require('electron');


// Функция создания главного окна приложения
function createWindow() {

  // Создаём окно
  const win = new BrowserWindow({

    // Начальный размер окна
    width: 1200,
    height: 800,

    // Настройки поведения встроенного браузера
    webPreferences: {

      // Разрешаем использовать Node.js внутри renderer
      // Нужно для работы Electron + наших модулей
      nodeIntegration: true,

      // Отключаем изоляцию контекста
      // Сейчас это упрощает разработку
      contextIsolation: false,
    },
  });

  // Загружаем стартовую HTML страницу
  win.loadFile('index.html');
}


// Когда Electron полностью готов — создаём окно
app.whenReady().then(() => {

  createWindow();

});
