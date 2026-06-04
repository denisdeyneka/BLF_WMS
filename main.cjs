// =====================================
// ELECTRON MAIN PROCESS
// =====================================

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// ==============================
// DB + SERVICES
// ==============================
const { initDB } = require('./modules/db/database.cjs');
const productService = require('./modules/services/productLibraryService.cjs');

// ==============================
// DB STATE FLAG
// ==============================
let dbReady = false;

// ==============================
// DB GUARD (защита от ранних вызовов)
// ==============================
function ensureDB() {
    if (!dbReady) {
        throw new Error('Database not initialized yet');
    }
}

// ==============================
// IPC SYSTEM
// ==============================
ipcMain.handle('system:ping', () => {
    return 'pong';
});

// ==============================
// IPC PRODUCTS
// ==============================
ipcMain.handle('products:getAll', () => {
    ensureDB();
    return productService.getAllProducts();
});

ipcMain.handle('products:create', (event, data) => {
    ensureDB();
    return productService.createProduct(data);
});

ipcMain.handle('products:update', (event, payload) => {
    ensureDB();
    return productService.updateProduct(payload.id, payload.data);
});

ipcMain.handle('products:delete', (event, id) => {
    ensureDB();
    return productService.deleteProduct(id);
});

ipcMain.handle('products:getById', (event, id) => {
    ensureDB();
    return productService.getProductById(id);
});

ipcMain.handle('products:search', (event, query) => {
    ensureDB();
    return productService.searchProducts(query);
});

// ==============================
// CREATE WINDOW
// ==============================
function createWindow() {
    const win = new BrowserWindow({
        width: 1400,
        height: 900,

        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.cjs')
        }
    });

    win.loadFile('index.html');

    // win.webContents.openDevTools(); // включи при отладке
}

// ==============================
// APP LIFECYCLE
// ==============================
app.whenReady().then(async () => {

    // 1. Инициализация базы (ОБЯЗАТЕЛЬНО WAIT)
    await initDB();

    // 2. отмечаем что БД готова
    dbReady = true;

    // 3. создаём окно
    createWindow();

    // macOS support
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// ==============================
// CLOSE HANDLING
// ==============================
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});