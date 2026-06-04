// =====================================
// PRODUCT LIBRARY SERVICE (CRUD layer v3 FIXED)
// =====================================

const db = require('../db/dbQuery.cjs');

// ==============================
// SELECT ALL
// ==============================
function getAllProducts() {
    return db.select(`
        SELECT
            id,
            code,
            name,
            category,
            display_name,
            description,
            primary_packaging,
            fill_volume,
            fill_dose,
            units_per_pack,
            packs_per_box,
            shelf_life,
            storage_zone,
            registration_certificate,
            country,
            is_active
        FROM product_library
        WHERE is_active = 1
        ORDER BY name
    `);
}

// ==============================
// CREATE
// ==============================
function createProduct(data) {
    return db.run(`
        INSERT INTO product_library (
            code,
            name,
            category,
            display_name,
            description,
            primary_packaging,
            fill_volume,
            fill_dose,
            units_per_pack,
            packs_per_box,
            shelf_life,
            storage_zone,
            registration_certificate,
            country,
            is_active
        )
        VALUES (
            '${escape(data.code)}',
            '${escape(data.name)}',
            '${escape(data.category)}',
            '${escape(data.display_name)}',
            '${escape(data.description)}',
            '${escape(data.primary_packaging)}',
            '${escape(data.fill_volume)}',
            '${escape(data.fill_dose)}',
            '${escape(data.units_per_pack)}',
            '${escape(data.packs_per_box)}',
            '${escape(data.shelf_life)}',
            '${escape(data.storage_zone)}',
            '${escape(data.registration_certificate)}',
            '${escape(data.country)}',
            1
        )
    `);
}

// ==============================
// UPDATE
// ==============================
function updateProduct(id, data) {
    return db.run(`
        UPDATE product_library
        SET
            code = '${escape(data.code)}',
            name = '${escape(data.name)}',
            category = '${escape(data.category)}',
            display_name = '${escape(data.display_name)}',
            description = '${escape(data.description)}',
            primary_packaging = '${escape(data.primary_packaging)}',
            fill_volume = '${escape(data.fill_volume)}',
            fill_dose = '${escape(data.fill_dose)}',
            units_per_pack = '${escape(data.units_per_pack)}',
            packs_per_box = '${escape(data.packs_per_box)}',
            shelf_life = '${escape(data.shelf_life)}',
            storage_zone = '${escape(data.storage_zone)}',
            registration_certificate = '${escape(data.registration_certificate)}',
            country = '${escape(data.country)}'
        WHERE id = ${id}
    `);
}

// ==============================
// DELETE (soft)
// ==============================
function deleteProduct(id) {
    return db.run(`
        UPDATE product_library
        SET is_active = 0
        WHERE id = ${id}
    `);
}

// ==============================
// GET BY ID
// ==============================
function getProductById(id) {
    const result = db.select(`
        SELECT *
        FROM product_library
        WHERE id = ${id}
        LIMIT 1
    `);

    return result[0] || null;
}

// ==============================
// SEARCH
// ==============================
function searchProducts(query) {
    return db.select(`
        SELECT *
        FROM product_library
        WHERE is_active = 1
          AND (
              name LIKE '%${query}%'
              OR code LIKE '%${query}%'
              OR display_name LIKE '%${query}%'
          )
        ORDER BY name
    `);
}

// ==============================
// ESCAPE
// ==============================
function escape(str) {
    if (!str) return '';
    return String(str).replace(/'/g, "''");
}

// ==============================
// EXPORT
// ==============================
module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    searchProducts
};