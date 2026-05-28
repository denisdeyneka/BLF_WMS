# BLF_WMS — Checkpoint 001 (UI + Warehouse Skeleton)

## 📅 Состояние на момент чекпоинта

Проект представляет собой ранний прототип WMS системы с Electron UI и модульной архитектурой на ES Modules.

---

## 🧠 Архитектура

### Entry point
- `app.js`
  - инициализация приложения
  - управление переключением представлений
  - связывание UI и модели данных

---

### Data layer
- `modules/data/warehouse.js`
  - модель склада
  - структура:
    - Zone → Rack → Location
  - каждая локация имеет:
    - `id` (A-01-01)
    - `zoneId`, `rackId`, `locId`
    - `stock[]`

---

### UI layer

#### Layout (Shell)
- `modules/ui/layout/shell.js`
  - формирует каркас приложения:
    - Header (навигация)
    - Main (контент)
    - Footer (статус)

- `header.js`
  - кнопки переключения:
    - Map
    - Table

- `footer.js`
  - статус приложения

---

#### Views

- `renderWarehouse.js`
  - графическое представление склада (Map View)
  - отображение зон / рядов / ячеек
  - визуализация stock (цвет + содержимое)

- `renderTable.js`
  - табличное представление остатков
  - строки:
    - location / product / series / qty

---

## 🔄 Navigation system

- реализован `viewManager` внутри `app.js`
- переключение между:
  - Map View
  - Table View

- используется единый контейнер `#app`

---

## 🧱 UI концепция

Принята архитектура:

> One Data Model → Multiple Views

- одна модель склада
- несколько способов отображения
- UI не изменяет данные напрямую

---

## 📦 Warehouse model

Локация содержит:

- уникальный ID (`A-01-01`)
- идентификаторы зоны/ряда/места
- stock:

```js
{
  productId,
  series,
  qty
}