// ======================================
// ELECTRON MAIN PROCESS
// ======================================

// Electron
const { app, BrowserWindow, ipcMain } = require('electron');

const path = require('path');

// инициализация БД
const { initDB } = require('./modules/db/database.cjs');

// сервис библиотеки препаратов
const productService =
require('./modules/services/productLibraryService.cjs');


// ======================================
// DATABASE INIT
// ======================================

initDB();


// ======================================
// IPC HANDLERS
// связь renderer -> backend
// ======================================

// получить все продукты
ipcMain.handle(
    'products:getAll',

    () => {

        return productService.getAllProducts();
    }
);


// создать продукт
ipcMain.handle(
    'products:create',

    (event, data) => {

        return productService.createProduct(data);
    }
);


// удалить продукт
ipcMain.handle(
    'products:delete',

    (event, id) => {

        return productService.deleteProduct(id);
    }
);

//edit product
ipcMain.handle(
    'products:update',
    (event, id, data) => {

        return productService.updateProduct(id, data);
    }
);


// ======================================
// CREATE WINDOW
// ======================================

function createWindow() {

    const win = new BrowserWindow({

        width: 1200,

        height: 800,

        webPreferences: {

            // bridge renderer <-> backend
            preload: path.join(
                __dirname,
                'preload.cjs'
            ),

            // renderer НЕ получает require()
            nodeIntegration: false,

            // включаем безопасный bridge
            contextIsolation: true
        }
    });


    // стартовая страница
    win.loadFile('index.html');
}


// ======================================
// APP READY
// ======================================

app.whenReady().then(() => {

    createWindow();
});


// ======================================
// APP CLOSE
// ======================================

app.on('window-all-closed', () => {

    if (process.platform !== 'darwin') {

        app.quit();
    }
});