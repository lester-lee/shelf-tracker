const express = require("express");
const app = express();
const db = require("./src/db/db");

const PORT = 4000;

// https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded
// Middleware that parses POST / PUT requests from a client
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle CORS w/ client
app.use((req, res, next) => {
  // Allow Vue client to access
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");

  // Allow specific requests
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Pass to next layer of middleware
  next();
});

app.get("/", (req, res) => {
  res.json({ info: "Shelf Tracker" });
});

//-----------------------------
// Database Routes
//-----------------------------
app.get("/shelving/all", db.getAllShelving);
app.get("/shelving/:id", db.getShelvingById);
app.get("/shelf/in/:shelvingId", db.getShelvesByShelving);
app.get("/shelf/:id", db.getShelfById);
app.get("/item/all", db.getAllItems);
app.get("/item/in/:shelfId", db.getItemsByShelf);
app.get("/item/:id", db.getItemById);

app.post("/shelving", db.addShelving);
app.post("/shelf", db.addShelf);
app.delete("/shelf/:shelfId", db.deleteShelf);
app.post("/item", db.addItem);
app.put("/item", db.updateItem);
app.delete("/item/:itemId", db.deleteItem);
app.delete("/item/in/:shelfId", db.deleteItemsByShelf);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
