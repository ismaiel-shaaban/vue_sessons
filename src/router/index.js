import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "All Program",
    component: () => import("../Views/Programs.vue"),
  },
  {
    path: "/add-program",
    name: "Add Program",
    component: () => import("../Views/AddProgramView.vue"),
  },
  {
    path: "/services-images",
    name: "Services Images",
    component: () => import("../Views/ServiceImages.vue"),
  },
  {
    path: "/archive",
    name: "Archive",
    component: () => import("../Views/ArchiveView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
