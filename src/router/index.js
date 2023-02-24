import { createRouter, createWebHistory } from "vue-router";
import useUserStore from "@/stores/user";
// import Home from "@/views/Home.vue";
// import About from "@/views/About.vue";
// import Manage from "@/views/Manage.vue";
// import Song from "@/components/Song.vue";

// Lazy Loading components, only load when needed,
const Home = () => import("@/views/Home.vue");
const About = () => import("@/views/About.vue");
const Manage = () => import("@/views/Manage.vue");
const Song = () => import("@/components/Song.vue");
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
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/manage",
    redirect: { name: "manage" },
    // beforeEnter: (to, from, next) => {
    //   console.log("Before Enter");
    //   next();
    // },
  },
  {
    name: "song",
    path: "/song/:id",
    component: Song,
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
  console.log("Global Navigation Guard", to.meta);
  if (!to.meta.requiresAuth) {
    next();
    return;
  }

  const store = useUserStore();

  console.log(store.userLoggedIn);
  if (store.userLoggedIn) {
    next();
  } else {
    next({ name: "home" });
  }
});

export default router;
