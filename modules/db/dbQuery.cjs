// ==============================
// DB QUERY LAYER (sql.js wrapper)
// ==============================

// подключаем текущую инициализированную БД
const { getDB, saveDB } = require('./database.cjs');

// /**
//  * SELECT-запрос
//  * @param {string} sql - SQL запрос SELECT
//  * @returns {Array<Object>} массив результатов
//  */
function select(sql) {
  const db = getDB();

  // готовим statement
  const stmt = db.prepare(sql);

  const result = [];

  // проходим по всем строкам результата
  while (stmt.step()) {
    result.push(stmt.getAsObject());
  }

  // освобождаем память
  stmt.free();

  return result;
}

// /**
//  * INSERT / UPDATE / DELETE
//  * @param {string} sql - SQL запрос
//  * @returns {any} результат выполнения
//  */
function run(sql) {
  const db = getDB();

  // выполняем запрос
  const result = db.run(sql);

  // сохраняем файл базы (sql.js работает в памяти)
  saveDB();

  return result;
}

// /**
//  * единый экспорт слоя БД
//  */
module.exports = {
  select,
  run,
};
