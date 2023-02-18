import { createRouter, createWebHistory } from "vue-router";
import useUserStore from "@/stores/user";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Manage from "@/views/Manage.vue";
const routes = [
  {
    name: "home",
    path: "/",
    component: Home,
  },
  {
    name: "about",
    path: "/about",
    component: About,
  },
  {
    name: "manage",
    // alias: "/manage",
    path: "/manage-music",
    component: Manage,
  },
  {
    path: "/manage",
    redirect: { name: "manage" },
    beforeEnter: (to, from, next) => {
      console.log("Before Enter");
      next();
    },
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/:catchAll(.*)*",
    redirect: { name: "home" },
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: "text-yellow-500",
});

// Global Navigation Guard
router.beforeEach((to, from, next) => {
  if (!to.meta.requiresAuth) {
    next();
    return;
  }

  const store = useUserStore();

  if (store.userLoggedIn) {
    next();
  } else {
    next({ name: "home" });
  }
});

export default router;
