import { createRouter, createWebHistory } from "vue-router";
import Recon from "@/views/Recon.vue";
import Capture from "@/views/Capture.vue"
import Filters from "@/views/Filters.vue";
import Scheduler from "@/views/Schedule.vue";
import Attack from "@/views/Attacks.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: Recon, component: Recon },
    { path: "/recon", redirect: "/" },

    { path: "/capture", component: Capture },

    { path: "/filter", component: Filters},

    { path: "/scheduler", component: Scheduler},

    { path: "/attack", component: Attack},
    // 404

    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
});

export default router;
