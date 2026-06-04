DROP TABLE IF EXISTS product_library;

CREATE TABLE product_library (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    code TEXT NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,

    display_name TEXT,

    description TEXT,

    primary_packaging TEXT,

    fill_volume REAL NOT NULL,
    fill_dose REAL,

    units_per_pack INTEGER NOT NULL,
    packs_per_box INTEGER,

    shelf_life INTEGER,
    storage_zone TEXT,

    registration_certificate TEXT,

    country TEXT,

    is_active INTEGER DEFAULT 1
);