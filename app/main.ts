import { createApp } from "vue";
// @ts-expect-error: Deno doesn't like importing .vue modules in .ts files
import App from "app/App.vue";
import { createRouter, createWebHistory } from "vue-router";

const app = createApp(App);

const router = createRouter({
  routes: [],
  history: createWebHistory(),
});

app.use(router);

app.mount(document.body);
