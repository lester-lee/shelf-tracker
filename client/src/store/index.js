import { createStore } from "vuex";
import ShelfService from "@/services/ShelfService";

const updateState = (property) => {
  return function (state, value) {
    state[property] = value;
  };
};

export default createStore({
  state: {
    shelving: {}, // {shelvingId: shelving}
    shelves: {}, // {shelvingId: shelves}
    items: {}, // {shelfId: items}
    newItems: {}, // {shelfId:newItemtext}
    search: "", // current search term in searchbar
  },
  mutations: {
    updateShelving: updateState("shelving"),
    updateShelves(state, { shelvingId, shelves }) {
      state.shelves[shelvingId] = shelves;
    },
    updateItems(state, { shelfId, items }) {
      state.items[shelfId] = items;
    },
    updateSearch: updateState("search"),
    updateNewItem(state, { shelfId, newItem }) {
      state.newItems[shelfId] = newItem;
    },
  },
  actions: {},
  modules: {},
});
