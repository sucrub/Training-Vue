import { createRouter, createWebHashHistory } from "vue-router";
import HomePage from "@/components/HomePage.vue";
import HelloWorld from "./components/HelloWorld.vue";
import BlogList from "./components/BlogList.vue";

// Define your routes
const routes = [
  {
    path: "/web/vue3",
    name: "HomePage",
    component: HomePage,
    meta: { requiresAuth: true },
  },
  {
    path: "/web/vue3/hello",
    name: "Hello",
    component: HelloWorld,
    meta: { requiresAuth: true }, // Protect this route
  },
  {
    path: "/web/vue3/blog",
    name: "BlogList",
    component: BlogList,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// Add a route guard to check login state
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem("accessToken"); // Check if token exists
  if (to.matched.some((record) => record.meta.requiresAuth) && !isLoggedIn) {
    next("/login"); // Redirect to login if not logged in
  } else {
    next(); // Proceed to the route
  }
});

export default router;
