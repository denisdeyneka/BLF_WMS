CREATE TABLE IF NOT EXISTS product_library (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    product_name TEXT NOT NULL,

    description TEXT,

    form TEXT,

    dosage TEXT,

    packaging TEXT,

    shelf_life TEXT,

    is_active INTEGER DEFAULT 1
);