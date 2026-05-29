CREATE TABLE IF NOT EXISTS products (
    productId INTEGER PRIMARY KEY AUTOINCREMENT,
    productName TEXT NOT NULL,
    dosage TEXT,
    form TEXT,
    packDescription TEXT,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS batches (
    batchId INTEGER PRIMARY KEY AUTOINCREMENT,
    productId INTEGER NOT NULL,
    batchNumber TEXT,
    expiryDate TEXT NOT NULL, -- YYYY-MM
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (productId) REFERENCES products(productId)
);