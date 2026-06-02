// bridge между renderer и electron backend

// =====================================
// ELECTRON PRELOAD (API BRIDGE)
// =====================================

const { contextBridge, ipcRenderer } = require('electron');

console.log('PRELOAD LOADED');

// =====================================
// EXPOSE API TO RENDERER
// =====================================

contextBridge.exposeInMainWorld('api', {

    // ---------------------
    // TEST
    // ---------------------
    ping: () => 'pong',

    // ---------------------
    // READ
    // ---------------------
    getProducts: () =>
        ipcRenderer.invoke('products:getAll'),

    // ---------------------
    // CREATE
    // ---------------------
    createProduct: (data) =>
        ipcRenderer.invoke(
            'products:create',
            data
        ),

    // ---------------------
    // UPDATE  ← ДОБАВИЛИ ЭТО
    // ---------------------
    updateProduct: (id, data) =>
        ipcRenderer.invoke(
            'products:update',
            id,
            data
        ),

    // ---------------------
    // DELETE
    // ---------------------
    deleteProduct: (id) =>
        ipcRenderer.invoke(
            'products:delete',
            id
        )
});