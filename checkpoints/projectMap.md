КАРТА ПРОЕКТА BLF_WMS (ТЕКУЩАЯ АРХИТЕКТУРА)

1. ТОЧКА ВХОДА (Electron)

📄 main.cjs

👉 главный процесс Electron

отвечает за:
создание окна (BrowserWindow)
IPC handlers (мост между UI и backend)
содержит:
ipcMain.handle('products:getAll')
ipcMain.handle('products:create')
ipcMain.handle('products:update')
ipcMain.handle('products:delete')

📄 index.html

👉 оболочка приложения (shell)

отвечает за:
layout (header / main / footer)
подключение app.js
контейнер #content

📄 app.js

👉 frontend router (SPA-light)

отвечает за:
переключение вкладок (Products / Warehouse)
рендер модулей в #content
подключение API (window.api)

2. IPC / BRIDGE (связь UI ↔ Electron)
📄 preload.cjs

👉 безопасный мост

отвечает за:
expose API в window.api
пример:
window.api.getProducts()
window.api.createProduct()

3. DATABASE LAYER (ядро данных)
📄 modules/db/database.cjs

👉 инициализация БД (sql.js)

отвечает за:
создание/загрузку warehouse.db
выполнение schema.sql
saveDB()
📄 modules/db/dbQuery.cjs

👉 low-level SQL слой

отвечает за:
select()
run()

📌 это “SQL wrapper”

📄 modules/db/schema.sql

👉 структура таблиц

сейчас содержит:
product_library
(будущие таблицы складских операций)

4. BUSINESS LOGIC (сервисы)
📄 modules/services/productLibraryService.cjs

👉 логика продуктов (CRUD)

отвечает за:
getAllProducts
createProduct
updateProduct
deleteProduct
searchProducts

📌 это НЕ UI и НЕ SQL напрямую

5. UI LAYER (интерфейс)
📄 modules/ui/productLibrary.js

👉 главный UI реестра

отвечает за:
таблицу продуктов
drawer (форма добавления/редактирования)
валидацию
вызовы API

📌 это самый “жирный” UI модуль сейчас

📄 modules/ui/renderWarehouse.js

👉 визуальная карта склада

📄 modules/ui/layout/shell.js

👉 альтернативный layout (если используешь)

6. СТИЛИ (SCSS)
📄 scss/main.scss

👉 главный импорт

подключает:
base/
layout/
components/
📄 scss/components/forms.scss

👉 ошибки, inputs, формы

📄 scss/layout/

👉 shell, header, footer

📄 css/style.css

👉 СГЕНЕРИРОВАННЫЙ файл (НЕ РЕДАКТИРУЕМ)

7. BUSINESS DATA (будущее)
сейчас:
только product_library
дальше будет:
stock movements
warehouse locations
batches (серии)
users / roles
🧠 ГЛАВНАЯ АРХИТЕКТУРНАЯ ИДЕЯ
UI (productLibrary.js)
        ↓
API (window.api)
        ↓
IPC (main.cjs)
        ↓
Service (productLibraryService.cjs)
        ↓
DB Layer (dbQuery.cjs)
        ↓
sql.js database