DROP TABLE IF EXISTS product_library;

CREATE TABLE product_library (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT,
    name TEXT,
    category TEXT,
    description TEXT,

    primary_packaging TEXT,
    fill_volume TEXT,
    group_packaging TEXT,
    units_per_box TEXT,

    shelf_life TEXT,
    storage_conditions TEXT,
    registration_certificate TEXT,
    country TEXT,

    is_active INTEGER DEFAULT 1
);