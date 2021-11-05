const http = require("@/http-common");

class ShelfService {
  getAllItems() {
    return http.get("/item/all");
  }
}

module.exports = new ShelfService();
