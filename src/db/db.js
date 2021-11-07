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
// Callback helper methods for database queries

/**
 * Either sends a 400 status w/ an error
 * or the successful result in JSON format
 */
const jsonHandler = (response) => (error, result) => {
  if (error) {
    console.error(error.message);
    response.status(400).json({ error: error.message });
    return;
  }
  response.json(result);
};

// Send a message if successful
const requestHandler = (response, statusCode, message) => (error, result) => {
  if (error) {
    console.error(error.message);
    response.status(400).json({ error: error.message });
    return;
  }
  console.debug(message);
  response.status(statusCode).send(message);
};

// Helper methods for querying the database
const getAllRows = (tableName) => (request, response) => {
  const query = `SELECT * FROM ${tableName}`;
  db.all(query, jsonHandler(response));
};

// Currently orderBy is unused but will leave here in case
const getAllRowsByColumn =
  (tableName, column, paramName, orderBy = null) =>
  (request, response) => {
    const param = parseInt(request.params[paramName]);
    let query = `SELECT * FROM ${tableName} WHERE ${column} = ?`;
    if (orderBy) {
      query += ` ORDER BY ${orderBy}`;
    }
    db.all(query, [param], jsonHandler(response));
  };

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

//-----------------------------
// #region Table Queries
//-----------------------------
// The functions below all query the database with a corresponding callback.
// These functions are relatively straightforward so comments are sparse.

//-----------------------------
// Shelving
//-----------------------------
const getAllShelving = getAllRows("Shelving");
const deleteShelving = (request, response) => {
  const shelvingId = parseInt(request.params.shelvingId);
  // Delete all associated shelves before deleting specified shelving
  deleteShelvesByShelving(shelvingId);
  deleteRowsByColumn(
    "Shelving",
    "shelving_id",
    "shelvingId"
  )(request, response);
};

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
const getShelvesByShelving = getAllRowsByColumn(
  "Shelf",
  "shelving_id",
  "shelvingId"
);

const addShelf = (request, response) => {
  const { label, shelvingId } = request.body;
  const query = "INSERT INTO Shelf (label, shelving_id) VALUES (?,?)";
  db.run(
    query,
    [label, shelvingId],
    requestHandler(response, 201, `New shelf '${label}' inserted.`)
  );
};

const deleteShelf = (request, response) => {
  // Delete all associated items as well as the specified shelf
  const shelfId = parseInt(request.params.shelfId);
  deleteItemsByShelf(shelfId);
  deleteRowsByColumn("Shelf", "shelf_id", "shelfId")(request, response);
};

const deleteShelvesByShelving = (shelvingId) => {
  // Get all shelves in shelving
  const queryShelves = "SELECT * FROM Shelf WHERE shelving_id = ?";
  db.all(queryShelves, [shelvingId], (error, result) => {
    if (error) {
      console.error(error);
      return;
    }
    // Delete items from all shelves in shelving
    result.forEach((shelf) => {
      deleteItemsByShelf(shelf.shelf_id);
    });
  });

  // Delete the shelves
  const query = "DELETE FROM Shelf WHERE shelving_id = ?";
  db.run(query, [shelvingId], (error, result) => {
    if (error) {
      console.error(error);
      return;
    }
    console.debug(
      `Deletion successful of all shelves in shelving#${shelvingId}`
    );
  });
};

//-----------------------------
// Item
//-----------------------------
const getItemsByShelf = getAllRowsByColumn("Item", "shelf_id", "shelfId");

const addItem = (request, response) => {
  const { label, shelfId } = request.body;
  const query = "INSERT INTO Item (label, shelf_id) VALUES (?,?)";
  db.run(
    query,
    [label, shelfId],
    requestHandler(response, 201, `New item '${label}' inserted.`)
  );
};

const deleteItem = deleteRowsByColumn("Item", "item_id", "itemId");
const deleteItemsByShelf = (shelfId) => {
  console.debug(`Deleting all items in shelf#${shelfId}`);
  const query = `DELETE FROM Item WHERE shelf_id = ?`;
  db.run(query, [shelfId], (error, result) => {
    if (error) {
      console.error(error.message);
    }
  });
};

const updateItem = (request, response) => {
  const { itemId, label, highlighted } = request.body;
  const query = "UPDATE Item SET label=?, highlighted=? WHERE item_id = ?";
  db.run(
    query,
    [label, highlighted, itemId],
    requestHandler(response, 200, `Item#${itemId} '${label}' updated.`)
  );
  //#endregion Table Queries
};

module.exports = {
  // Shelving
  getAllShelving,
  addShelving,
  deleteShelving,
  // Shelf
  getShelvesByShelving,
  addShelf,
  deleteShelf,
  // Item
  getItemsByShelf,
  addItem,
  updateItem,
  deleteItem,
};
