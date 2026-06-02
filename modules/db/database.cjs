const fs = require('fs');
const path = require('path');
const initSqlJs = require('sql.js');

// путь к файлу базы
const dbFilePath = path.join(__dirname, 'warehouse.db');

// SQL схема
const schemaPath = path.join(__dirname, 'schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf-8');

// переменная базы (инициализируется позже)
let db;

async function initDB() {

    const SQL = await initSqlJs();

    if (fs.existsSync(dbFilePath)) {

        const fileBuffer = fs.readFileSync(dbFilePath);

        db = new SQL.Database(fileBuffer);

        console.log('[DB] loaded existing database');

    } else {

        db = new SQL.Database();

        db.run(schema);

        saveDB();

        console.log('[DB] created new database');

    }

    console.log(
        db.exec(
            "SELECT name FROM sqlite_master WHERE type='table'"
        )
    );

    return db;
}

// сохранение базы в файл
function saveDB() {
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(dbFilePath, buffer);
}

module.exports = {
    initDB,
    getDB: () => db,
    saveDB
};