// =====================================
// PRODUCT LIBRARY SERVICE (CRUD layer)
// =====================================

const db = require('../db/dbQuery.cjs');

/**
 * Получить все активные продукты
 */
function getAllProducts() {
    return db.select(`
        SELECT *
        FROM product_library
        WHERE is_active = 1
        ORDER BY product_name
    `);
}

/**
 * Создать новый продукт
 */
function createProduct(data) {
    return db.run(`
        INSERT INTO product_library (
            product_name,
            description,
            form,
            dosage,
            packaging,
            shelf_life,
            is_active
        )
        VALUES (
            '${data.product_name}',
            '${data.description}',
            '${data.form}',
            '${data.dosage}',
            '${data.packaging}',
            '${data.shelf_life}',
            1
        )
    `);
}

/**
 * Обновить продукт
 */
function updateProduct(id, data) {
    return db.run(`
        UPDATE product_library
        SET
            product_name = '${data.product_name}',
            description = '${data.description}',
            form = '${data.form}',
            dosage = '${data.dosage}',
            packaging = '${data.packaging}',
            shelf_life = '${data.shelf_life}'
        WHERE id = ${id}
    `);
}

/**
 * Мягкое удаление
 */
function deleteProduct(id) {
    return db.run(`
        UPDATE product_library
        SET is_active = 0
        WHERE id = ${id}
    `);
}

/**
 * Получить один продукт
 */
function getProductById(id) {
    const result = db.select(`
        SELECT *
        FROM product_library
        WHERE id = ${id}
        LIMIT 1
    `);

    return result[0] || null;
}

/**
 * поиск по имени
 */
function searchProducts(query) {
    return db.select(`
        SELECT *
        FROM product_library
        WHERE is_active = 1
          AND product_name LIKE '%${query}%'
        ORDER BY product_name
    `);
}

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    searchProducts
};