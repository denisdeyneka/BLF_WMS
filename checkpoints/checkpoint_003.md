# BLF_WMS — Checkpoint 003 (Database Design)

## 📅 Состояние проекта

Проект перешёл от UI-прототипа к проектированию реальной базы данных (SQLite) для WMS системы.

---

## 🧠 Принятая концепция данных

Система построена по event-based принципу:

> Все изменения склада происходят только через movements

---

## 📦 Основные сущности базы данных

### 1. PRODUCTS (справочник препаратов)
Хранит список всех доступных товаров.

- id (PK)
- name
- is_active

---

### 2. LOCATIONS (структура склада)
Физическая модель склада.

- id (A-01-01)
- zone_id
- rack_id
- loc_id
- status

---

### 3. STOCK (текущее состояние)
Снимок текущих остатков на складе.

- id (PK)
- location_id (FK)
- product_id (FK)
- series
- qty

---

### 4. MOVEMENTS (операции склада)
Основное ядро системы изменений.

- id (PK)
- type (IN / OUT / MOVE / RESERVE / RELEASE / ADJUST)
- created_at
- user
- comment

---

### 5. MOVEMENT_ITEMS (детализация операций)
Связь движения с конкретными товарами и локациями.

- id (PK)
- movement_id (FK)
- product_id (FK)
- series
- qty
- from_location
- to_location

---

### 6. AUDIT_LOG (системный журнал)
Технический лог событий системы.

- id (PK)
- event_type
- message
- created_at

---

## 🧠 Архитектурные принципы

- Stock НЕ редактируется напрямую
- Все изменения идут через movements
- History строится из movements
- Audit log фиксирует системные события
- UI не содержит бизнес-логики

---

## 🧭 Общая модель системы

```text
PRODUCTS → что существует
LOCATIONS → где можно хранить
STOCK → текущее состояние
MOVEMENTS → изменения
MOVEMENT_ITEMS → детализация изменений
AUDIT_LOG → системные события