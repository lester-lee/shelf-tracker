import { createStore } from "vuex";
import ShelfService from "@/services/ShelfService";

export default createStore({
  state: {
    shelving: [],
  },
  mutations: {
    setShelving(state, shelving) {
      state.shelving = shelving;
    },
  },
  actions: {
    getAllShelving({ commit }) {
      ShelfService.getAllShelving()
        .then((response) => {
          commit("setShelving", response.data);
        })
        .catch((e) => console.log(e));
    },
  },
  modules: {},
});
