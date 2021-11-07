const { table } = require("console");
const { response, query } = require("express");
const path = require("path");

//-----------------------------
// Database Connection
//-----------------------------
const sqlite = require("sqlite3").verbose();
const dbFile = path.join(__dirname, "shelves.db");
const db = new sqlite.Database(dbFile, (error) => {
  if (error) return console.error(error.message);
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

function deleteRowsByColumn(tableName, column, paramName) {
  return (request, response) => {
    const param = parseInt(request.params[paramName]);
    const query = `DELETE FROM ${tableName} WHERE ${column} = ?`;
    db.run(
      query,
      [param],
      requestHandler(
        response,
        200,
        `Deletion successful from table ${tableName} by ${column} with value ${param}`
      )
    );
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

const addShelving = (request, response) => {
  const { label } = request.body;
  const query = "INSERT INTO Shelving (label) VALUES (?)";
  db.run(
    query,
    [label],
    requestHandler(response, 201, `New shelving '${label}' inserted.`)
  );
};

//-----------------------------
// Shelf
//-----------------------------
const getShelfById = getRowByColumn("Shelf", "shelf_id", "id");
const getShelvesByShelving = allRowsByColumn(
  "Shelf",
  "shelving_id",
  "shelvingId"
);
const getAllShelves = allRows("Shelf");
const deleteShelf = deleteRowsByColumn("Shelf", "shelf_id", "shelfId");

const addShelf = (request, response) => {
  const { label, shelvingId } = request.body;
  const query = "INSERT INTO Shelf (label, shelving_id) VALUES (?,?)";
  db.run(
    query,
    [label, shelvingId],
    requestHandler(response, 201, `New shelf '${label}' inserted.`)
  );
};

//-----------------------------
// Item
//-----------------------------
const getItemById = getRowByColumn("Item", "item_id", "id");
const getItemsByShelf = allRowsByColumn("Item", "shelf_id", "shelfId");
const getAllItems = allRows("Item");
const deleteItem = deleteRowsByColumn("Item", "item_id", "itemId");
const deleteItemsByShelf = deleteRowsByColumn("Item", "shelf_id", "shelfId");

const addItem = (request, response) => {
  const { label, shelfId } = request.body;
  const query = "INSERT INTO Item (label, shelf_id) VALUES (?,?)";
  db.run(
    query,
    [label, shelfId],
    requestHandler(response, 201, `New item '${label}' inserted.`)
  );
};

const updateItem = (request, response) => {
  const { itemId, label, highlighted } = request.body;
  const query = "UPDATE Item SET label=?, highlighted=? WHERE item_id = ?";
  db.run(
    query,
    [label, highlighted, itemId],
    requestHandler(response, 200, `Item#${itemId} '${label}' updated.`)
  );
};

module.exports = {
  // Shelving
  getShelvingById,
  getAllShelving,
  addShelving,
  // Shelf
  getShelfById,
  getShelvesByShelving,
  getAllShelves,
  addShelf,
  deleteShelf,
  // Item
  getItemById,
  getItemsByShelf,
  getAllItems,
  addItem,
  updateItem,
  deleteItem,
  deleteItemsByShelf,
};
