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
app.get("/shelving/:id", db.getShelvingById);
app.get("/shelf/:id", db.getShelfById);
app.get("/item/:id", db.getItemById);
app.get("/itemsByShelf/:shelfId", db.getItemsByShelf)

/* Database routes, might be useful later

app.get("/users", db.getUsers);
app.get("/users/:id", db.getUserById);
app.post("/users", db.createUser);
app.delete("/users/:id", db.deleteUser);

app.get("/todos", db.getTodos);
app.post("/todos", db.addTodo);
app.delete("/todos/:id", db.deleteTodo)
app.put("/todos", db.updateTodo)

*/

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
