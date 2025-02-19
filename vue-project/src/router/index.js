import { createRouter, createWebHistory } from "vue-router";
import BlogList from "@/components/BlogList.vue";
import UpdateBlogDetail from "@/components/UpdateBlogDetail.vue";
import BlogDetail from "@/components/BlogDetail.vue";
import Test from "@/components/Test.vue";

const routes = [
  {
    path: "/",
    component: BlogList,
  },
  {
    path: "/blog/:id",
    component: BlogDetail,
    props: true,
  },
  {
    path: "/blog/edit/:id",
    component: UpdateBlogDetail,
    props: true,
  },

  {
    path: "/test",
    component: Test,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
