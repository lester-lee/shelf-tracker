import { createStore } from "vuex";
import ShelfService from "@/services/ShelfService";

const updateState = (property) => {
  return function (state, value) {
    state[property] = value;
  };
};

export default createStore({
  state: {
    shelving: [],
    search: "",
    newItems: {},
  },
  mutations: {
    setShelving: updateState("shelving"),
    updateSearch: updateState("search"),
    updateNewItem(state, {shelfId, newItem}) {
      state.newItems[shelfId] = newItem;
      console.log(state.newItems);
    },
  },
  actions: {
    getAllShelving({ commit }) {
      console.log("Get all shelving.");
      ShelfService.getAllShelving()
        .then((response) => {
          commit("setShelving", response.data);
        })
        .catch((e) => console.log(e));
    },
  },
  modules: {},
});
