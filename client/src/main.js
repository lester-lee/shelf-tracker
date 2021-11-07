import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/scss/global.scss";
import ShelfService from "@/services/ShelfService";

const app = createApp(App);
app.config.globalProperties.$ShelfService = ShelfService;
app.use(store).use(router).mount("#app");
