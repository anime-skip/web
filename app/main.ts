import { createApp } from "vue";
import { createRouter, createWebHistory, RouterView } from "vue-router";

const router = createRouter({
  routes: [
    {
      path: "/",
      component: () => import("app/layouts/DefaultLayout.vue"),
      children: [
        {
          path: "",
          component: () => import("app/pages/Home.vue"),
        },
        {
          path: "get-started",
          component: () => import("app/pages/GetStarted.vue"),
        },
      ],
    },
  ],
  history: createWebHistory(),
});

const app = createApp(RouterView);
app.use(router);
app.mount(document.body);
