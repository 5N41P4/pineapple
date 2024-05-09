import { createRouter, createWebHistory } from "vue-router";
import Recon from "@/views/Recon.vue";
import Capture from "@/views/Capture.vue"
import Filters from "@/views/Filters.vue";
import Maps from "@/views/Maps.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: Recon, component: Recon },
    { path: "/recon", redirect: "/" },

    { path: "/capture", component: Capture },

    { path: "/filter", component: Filters},

    { path: "/maps", component: Maps},
    // 404

    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
});

export default router;
