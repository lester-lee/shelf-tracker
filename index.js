const express = require("express");
const app = express();
const db = require("./src/db/db");
const dotenv = require("dotenv").config();

//-----------------------------
// App Config
//-----------------------------

// https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded
// Middleware that parses POST / PUT requests from a client
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle CORS w/ client
app.use((req, res, next) => {
  // Allow access from multiple origins
  const allowedOrigins = [
    "http://localhost:8080",
    "http://192.168.0.202:8802",
    "http://192.168.0.201:8802",
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  // Allow specific requests
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Pass to next layer of middleware
  next();
});

//-----------------------------
// Database Routes
//-----------------------------

app.get("/", (req, res) => {
  res.json({ info: "Shelf Tracker" });
});

// Shelving
app.get("/shelving/all", db.getAllShelving);
app.post("/shelving", db.addShelving);
app.delete("/shelving/:shelvingId", db.deleteShelving);

// Shelf
app.get("/shelf/in/:shelvingId", db.getShelvesByShelving);
app.post("/shelf", db.addShelf);
app.delete("/shelf/:shelfId", db.deleteShelf);

// Item
app.get("/item/in/:shelfId", db.getItemsByShelf);
app.post("/item", db.addItem);
app.put("/item", db.updateItem);
app.delete("/item/:itemId", db.deleteItem);

//-----------------------------
// Server
//-----------------------------

const PORT = process.env.PORT;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Listening on port ${PORT}`);
});
