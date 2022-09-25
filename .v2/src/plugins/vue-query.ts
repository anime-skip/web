import { VueQueryPlugin } from 'vue-query';

export default defineNuxtPlugin(nuxt => {
  nuxt.vueApp.use(VueQueryPlugin);
});
