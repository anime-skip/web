import { useAuthStore } from '~~/stores/useAuthStore';

export default defineNuxtRouteMiddleware((to, from) => {
  console.log('Running router middleware', { server: process.server, client: process.client });

  // The site is statically rendered, so redirects should be done client-side
  if (!process.client) return;

  const app = useNuxtApp();
  const auth = useAuthStore(app.$pinia);

  if (!auth.accessToken) {
    return navigateTo({ path: '/login', query: { redirect: to.fullPath } });
  }
});
