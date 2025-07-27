import { createApp } from "vue";
import { createRouter, createWebHistory, RouterView } from "vue-router";
import { createHead } from "@unhead/vue/client";
import { VueQueryPlugin } from "@tanstack/vue-query";

const router = createRouter({
  routes: [
    {
      path: "/",
      component: () => import("app/pages/Home.vue"),
    },
    {
      path: "/get-started",
      component: () => import("app/pages/GetStarted.vue"),
    },
    {
      path: "/sign-in",
      component: () => import("app/pages/SignIn.vue"),
    },
    {
      path: "/sign-up",
      component: () => import("app/pages/SignUp.vue"),
    },
    {
      path: "/forgot-password",
      component: () => import("app/pages/ForgotPassword.vue"),
    },
    {
      path: "/reset-password",
      component: () => import("app/pages/ResetPassword.vue"),
    },
    {
      path: "/account",
      component: () => import("app/pages/account/index.vue"),
      children: [
        {
          path: "",
          component: () => import("app/pages/account/Profile.vue"),
        },
        {
          path: "security",
          component: () => import("app/pages/account/Security.vue"),
        },
        {
          path: "api-clients",
          component: () => import("app/pages/account/ApiClients.vue"),
        },
      ],
    },
    {
      path: "/admin",
      component: () => import("app/pages/Admin.vue"),
    },
    {
      path: "/support",
      component: () => import("app/pages/Support.vue"),
    },
    {
      path: "/docs/contributing-timestamps",
      component: () => import("app/pages/docs/ContributingTimestamps.vue"),
    },
    {
      path: "/docs/policies/privacy",
      component: () => import("app/pages/docs/policies/PrivacyPolicy.vue"),
    },
    {
      path: "/docs/policies/extension-privacy",
      component: () =>
        import("app/pages/docs/policies/ExtensionPrivacyPolicy.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("app/pages/404.vue"),
    },
  ],
  history: createWebHistory(),
});

const head = createHead();

createApp(RouterView)
  .use(VueQueryPlugin)
  .use(router)
  .use(head)
  .mount(document.body);

console.log("Hydrated in", performance.now(), "ms");
