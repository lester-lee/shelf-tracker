const http = require("@/http-common");

class ShelfService {
  //-----------------------------
  // Private API client methods
  //-----------------------------
  #getAllShelving() {
    return http.get("/shelving/all");
  }

  #getShelvingById(id) {
    return http.get(`/shelving/${id}`);
  }

  /**
   * For each shelving, get respective shelves and commit to store.
   * This also populates the shelves with respective items.
   */
  #getAllShelves(store) {
    console.debug("Get all shelves");
    // For each shelvingId, get shelves and commit them to store
    Object.keys(store.state.shelving).forEach((shelvingId) => {
      this.#getShelvesByShelving(shelvingId)
        .then((response) => {
          const shelves = response.data;
          store.commit("updateShelves", { shelvingId, shelves });
          // Populate each shelf with items
          /*
          Called here since this is async within a loop
          Can't use await so this is the best I got for now
          Can probably clean this up later
          */
          shelves.forEach((s) => this.#getItemsByShelf(store, s.shelf_id));
        })
        .catch((e) => console.error(e));
    });
  }

  #getShelvesByShelving(shelving_id) {
    return http.get(`/shelf/in/${shelving_id}`);
  }

  #getAllItems() {
    return http.get("/item/all");
  }

  #getItemsByShelf(store, shelfId) {
    http
      .get(`/item/in/${shelfId}`)
      .then((response) => {
        const items = response.data;
        store.commit("updateItems", { shelfId, items });
      })
      .catch((e) => console.error(e));
  }

  #addItem(item) {
    return http.post("/item/", item);
  }

  #updateItem(item) {
    return http.put("/item/", item);
  }

  //-----------------------------
  // Public methods for components to call
  //-----------------------------
  /**
   * Consumes the API to get all shelving, and then
   * commits them to store. Once this is done, populate
   * the respective shelves.
   */
  getAllShelving(store) {
    console.debug("Get all shelving");
    this.#getAllShelving()
      .then((response) => {
        // Convert list of shelvings into {id: shelving}
        const shelving = response.data.reduce(
          (obj, item) => ((obj[item.shelving_id] = item), obj),
          {}
        );
        store.commit("updateShelving", shelving);
        this.#getAllShelves(store);
      })
      .catch((e) => console.error(e));
  }

  /**
   * Consumes API to add a new item (name, shelfId)
   * If successful, it will clear the newItem text input
   * and update the store with the new shelf information
   */
  addItem(store, { shelfId }) {
    const name = store.state.newItems[shelfId];
    console.debug(`Adding new item '${name}' to shelf#${shelfId}`);
    this.#addItem({ name, shelfId })
      .then((response) => {
        store.commit("updateNewItem", { shelfId, newItem: "" });
        this.#getItemsByShelf(store, shelfId);
      })
      .catch((e) => console.error(e));
  }

  updateItem(store, { item }) {
    this.#updateItem(item).catch((e) => console.error(e));
  }
}

module.exports = new ShelfService();
