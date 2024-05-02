import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Recon from "../views/Recon.vue";
import Filters from "../views/Filters.vue";
import Capture from "../views/Capture.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: Dashboard, component: Dashboard },
    { path: "/dashboard", redirect: "/" },

    { path: "/recon", component: Recon },

    { path: "/filter", component: Filters},

    { path: "/capture", component: Capture},
    // 404

    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
});

export default router;
