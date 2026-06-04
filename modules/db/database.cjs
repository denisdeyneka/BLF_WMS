const fs = require('fs');
const path = require('path');
const initSqlJs = require('sql.js');

const dbFilePath = path.join(__dirname, 'warehouse.db');
const schemaPath = path.join(__dirname, 'schema.sql');

const schema = fs.readFileSync(schemaPath, 'utf-8');

let db;

async function initDB() {

    const SQL = await initSqlJs();

    // =========================
    // LOAD OR CREATE
    // =========================
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

    console.log('[DB] tables:');
    console.log(
        db.exec("SELECT name FROM sqlite_master WHERE type='table'")
    );
    console.log('[DB PATH]', dbFilePath);
console.log('[DB EXISTS]', fs.existsSync(dbFilePath));

    return db;
}

// =========================
// SAVE DB TO FILE
// =========================
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