import { createRouter, createWebHistory } from "vue-router";
import Recon from "../views/Recon.vue";
import Filters from "../views/Filters.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: Recon, component: Recon },
    { path: "/recon", redirect: "/" },

    { path: "/filter", component: Filters},
    // 404

    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
});

export default router;
