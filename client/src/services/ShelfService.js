const http = require("@/http-common");

class ShelfService {
  getAllShelving() {
    return http.get("/shelving/all");
  }
  getShelvingById(id) {
    return http.get(`/shelving/${id}`);
  }
  getAllShelves() {
    return http.get("/shelves/all");
  }
  getShelvesByShelving(shelving_id) {
    return http.get(`/shelf/in/${shelving_id}`);
  }
  getAllItems() {
    return http.get("/item/all");
  }
  getItemsByShelf(shelf_id) {
    return http.get(`/item/in/${shelf_id}`);
  }
}

module.exports = new ShelfService();
