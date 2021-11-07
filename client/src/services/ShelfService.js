const http = require("@/http-common");

class ShelfService {
  //-----------------------------
  // Private API client methods
  //-----------------------------

  // Shelving
  #getAllShelving() {
    return http.get("/shelving/all");
  }

  #addShelving(shelving) {
    return http.post("/shelving", shelving);
  }

  // Shelf

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

  #addShelf(shelf) {
    return http.post("/shelf", shelf);
  }

  #deleteShelf(shelfId) {
    return http.delete(`/shelf/${shelfId}`);
  }

  // Item

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

  #deleteItem(itemId) {
    return http.delete(`/item/${itemId}`);
  }

  #deleteItemsByShelf(shelfId) {
    return http.delete(`/item/in/${shelfId}`);
  }

  //-----------------------------
  // Public methods for components to call
  //-----------------------------

  // Shelving

  /**
   * Sends API request to get all shelving, and then
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
   * Sends API request to add a new shelving; once
   * this is done, getAllShelving is called to force update
   */
  addShelving(store, { label }) {
    console.debug(`Add new shelving '${label}'`);
    this.#addShelving({ label })
      .then(() => {
        this.getAllShelving(store);
      })
      .catch((e) => console.error(e));
  }

  /**
   * Sends API request to add a new shelf; once
   * this is done, getAllShelves is called to force update
   */
  addShelf(store, { label, shelvingId }) {
    console.debug(`Add new shelf '${label}' to shelving#${shelvingId}`);
    this.#addShelf({ label, shelvingId })
      .then(() => {
        this.#getAllShelves(store);
      })
      .catch((e) => console.error(e));
  }

  deleteShelf(store, { shelfId }) {
    this.#deleteShelf(shelfId)
      .then((response) => {
        console.debug(response.data);
        this.#deleteItemsByShelf(shelfId);
        this.#getAllShelves(store);
      })
      .catch((e) => console.error(e));
  }

  // Item

  /**
   * Consumes API to add a new item (label, shelfId)
   * If successful, it will clear the newItem text input
   * and update the store with the new shelf information
   */
  addItem(store, { label, shelfId }) {
    this.#addItem({ label, shelfId })
      .then((response) => {
        console.debug(response.data);
        this.#getItemsByShelf(store, shelfId);
      })
      .catch((e) => console.error(e));
  }

  updateItem(store, { item }) {
    this.#updateItem(item)
      .then((response) => console.debug(response.data))
      .catch((e) => console.error(e));
  }

  deleteItem(store, { itemId, shelfId }) {
    this.#deleteItem(itemId)
      .then((response) => {
        console.debug(response.data);
        this.#getItemsByShelf(store, shelfId);
      })
      .catch((e) => console.error(e));
  }
}

module.exports = new ShelfService();
