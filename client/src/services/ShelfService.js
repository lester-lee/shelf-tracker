const http = require("@/http-common");

class ShelfService {
  getAllShelving() {
    return http.get("/shelving/all");
  }
  getAllItems() {
    return http.get("/item/all");
  }
}

module.exports = new ShelfService();
