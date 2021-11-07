import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  /*
  {
    path: "/about",
    name: "About",
    // Look up Lazy Loading Routes for more info
    component: () =>
      import(/* webpackChunkName: "about" * / "../views/About.vue"),
  },
  */
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
