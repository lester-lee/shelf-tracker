const { table } = require("console");
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

function allRowsByColumn(tableName, column, paramName, orderBy = null) {
  return (request, response) => {
    const param = parseInt(request.params[paramName]);
    let query = `SELECT * FROM ${tableName} WHERE ${column} = ?`;
    if (orderBy) {
      query += ` ORDER BY ${orderBy}`;
    }
    db.all(query, [param], (error, result) => {
      if (error) {
        response.status(400).json({ error: error.message });
        return;
      }
      response.json(result);
    });
  };
}

function allRows(tableName) {
  return (request, response) => {
    const query = `SELECT * FROM ${tableName}`;
    db.all(query, (error, result) => {
      if (error) {
        response.status(400).json({ error: error.message });
        return;
      }
      response.json(result);
    });
  };
}

const requestHandler = (response, statusCode, message) => (error, result) => {
  if (error) {
    response.status(400).json({ error: error.message });
    return;
  }
  response.status(statusCode).send(message);
};

//-----------------------------
// Shelving
//-----------------------------
const getShelvingById = getRowByColumn("Shelving", "shelving_id", "id");
const getAllShelving = allRows("Shelving");

//-----------------------------
// Shelf
//-----------------------------
const getShelfById = getRowByColumn("Shelf", "shelf_id", "id");
const getShelvesByShelving = allRowsByColumn(
  "Shelf",
  "shelving_id",
  "shelvingId",
  "position ASC"
);
const getAllShelves = allRows("Shelf");

const addShelf = (request, response) => {
  const { label, shelvingId } = request.body;
  const query = "INSERT INTO Shelf (label, shelving_id) VALUES (?,?)";
  db.run(query, [label, shelvingId], requestHandler(response));
};

//-----------------------------
// Item
//-----------------------------
const getItemById = getRowByColumn("Item", "item_id", "id");
const getItemsByShelf = allRowsByColumn("Item", "shelf_id", "shelfId");
const getAllItems = allRows("Item");

const addItem = (request, response) => {
  const { name, shelfId } = request.body;
  const query = "INSERT INTO Item (name, shelf_id) VALUES (?,?)";
  db.run(
    query,
    [name, shelfId],
    requestHandler(response, 201, "Insert successful.")
  );
};

const updateItem = (request, response) => {
  const { itemId, name, highlighted } = request.body;
  console.debug(itemId, name, highlighted);
  const query = "UPDATE Item SET name=?, highlighted=? WHERE item_id = ?";
  db.run(
    query,
    [name, highlighted, itemId],
    requestHandler(response, 200, `Item#${itemId} '${name}' updated.'`)
  );
};

module.exports = {
  getShelvingById,
  getAllShelving,
  getShelfById,
  getShelvesByShelving,
  getAllShelves,
  getItemById,
  getItemsByShelf,
  getAllItems,
  addItem,
  updateItem,
};
