const http = require("@/http-common");

/**
 * ShelfService is responsible for handling
 * all API requests; it also communicates with
 * the Vuex store with this updated information.
 */
class ShelfService {
  //-----------------------------
  // Utility
  //-----------------------------

  #get = (endpoint) => (param) => http.get(`${endpoint}/${param}`);
  #post = (endpoint) => (param) => http.post(endpoint, param);
  #put = (endpoint) => (param) => http.put(endpoint, param);
  #delete = (endpoint) => (param) => http.delete(`${endpoint}/${param}`);

  //-----------------------------
  // Private API client methods
  //-----------------------------

  // Shelving
  #getAllShelving = () => this.#get("/shelving")("all");
  #addShelving = this.#post("/shelving");
  #deleteShelving = this.#delete("/shelving");

  // Shelf
  #getShelvesByShelving = this.#get("/shelf/in");
  #addShelf = this.#post("/shelf");
  #deleteShelf = this.#delete("/shelf");

  /**
   * For each shelving, get respective shelves and commit to store.
   * This also populates the shelves with respective items.
   */
  #getAllShelves = (store) => {
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
  };

  // Item
  #addItem = this.#post("/item");
  #updateItem = this.#put("/item");
  #deleteItem = this.#delete("/item");

  #getItemsByShelf = (store, shelfId) => {
    http
      .get(`/item/in/${shelfId}`)
      .then((response) => {
        const items = response.data;
        store.commit("updateItems", { shelfId, items });
      })
      .catch((e) => console.error(e));
  };

  //-----------------------------
  // Component Methods
  //-----------------------------
  // These methods all send requests to get/add/update/delete,
  // then force rerenders by committing to the store

  // Shelving
  /**
   * Sends API request to get all shelving, and then
   * commits them to store. Once this is done, populate
   * the respective shelves.
   */
  getAllShelving(store) {
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

  addShelving(store, { label }) {
    this.#addShelving({ label })
      .then((response) => {
        this.getAllShelving(store);
      })
      .catch((e) => console.error(e));
  }

  deleteShelving(store, { shelvingId }) {
    this.#deleteShelving(shelvingId)
      .then((response) => {
        this.getAllShelving(store);
      })
      .catch((e) => console.error(e));
  }

  // Shelf
  addShelf(store, { label, shelvingId }) {
    this.#addShelf({ label, shelvingId })
      .then(() => {
        this.#getAllShelves(store);
      })
      .catch((e) => console.error(e));
  }

  deleteShelf(store, { shelfId }) {
    this.#deleteShelf(shelfId)
      .then((response) => {
        //this.#deleteItemsByShelf(shelfId);
        this.#getAllShelves(store);
      })
      .catch((e) => console.error(e));
  }

  // Item
  addItem(store, { label, shelfId }) {
    this.#addItem({ label, shelfId })
      .then((response) => {
        this.#getItemsByShelf(store, shelfId);
      })
      .catch((e) => console.error(e));
  }

  updateItem(store, { item }) {
    this.#updateItem(item).catch((e) => console.error(e));
  }

  deleteItem(store, { itemId, shelfId }) {
    this.#deleteItem(itemId)
      .then((response) => {
        this.#getItemsByShelf(store, shelfId);
      })
      .catch((e) => console.error(e));
  }
}

module.exports = new ShelfService();
