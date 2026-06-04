// bridge между renderer и electron backend

const { contextBridge, ipcRenderer } = require('electron');

// ==============================
// CLEAN DATA LAYER API
// ==============================
contextBridge.exposeInMainWorld('api', {
  // =========================
  // SYSTEM
  // =========================
  ping: () => ipcRenderer.invoke('system:ping'),

  // =========================
  // PRODUCTS
  // =========================
  getProducts: () => ipcRenderer.invoke('products:getAll'),

  createProduct: (data) => ipcRenderer.invoke('products:create', data),

  updateProduct: (id, data) =>
    ipcRenderer.invoke('products:update', { id, data }),

  deleteProduct: (id) => ipcRenderer.invoke('products:delete', id),

  getProductById: (id) => ipcRenderer.invoke('products:getById', id),

  searchProducts: (query) => ipcRenderer.invoke('products:search', query),
});
