const { response, query } = require("express");
const path = require("path");

//-----------------------------
// Database Connection
//-----------------------------
const sqlite = require("sqlite3").verbose();
const dbFile = path.join(__dirname, "shelves.db");
const db = new sqlite.Database(dbFile, (error) => {
  if (error) return console.log(error.message);
  console.log(`Connected to database ${dbFile}`);
});

//-----------------------------
// Util
//-----------------------------
function getRowByColumn(tableName, column, paramName) {
  return (request, response) => {
    const param = parseInt(request.params[paramName]);
    const query = `SELECT * FROM ${tableName} WHERE ${column} = ?`;
    db.get(query, [param], (error, result) => {
      if (error) {
        response.status(400).json({ error: error.message });
        return;
      }
      response.json(result);
    });
  };
}

function allRowsByColumn(tableName, column, paramName) {
  return (request, response) => {
    const param = parseInt(request.params[paramName]);
    const query = `SELECT * FROM ${tableName} WHERE ${column} = ?`;
    db.all(query, [param], (error, result) => {
      if (error) {
        response.status(400).json({ error: error.message });
        return;
      }
      response.json(result);
    });
  };
}

//-----------------------------
// Shelving
//-----------------------------
const getShelvingById = getRowByColumn("Shelving", "shelving_id", "id");

//-----------------------------
// Shelf
//-----------------------------
const getShelfById = getRowByColumn("Shelf", "shelf_id", "id");

//-----------------------------
// Item
//-----------------------------
const getItemById = getRowByColumn("Item", "item_id", "id");
const getItemsByShelf = allRowsByColumn("Item", "shelf_id", "shelfId");

module.exports = {
  getShelvingById,
  getShelfById,
  getItemById,
  getItemsByShelf,
};
