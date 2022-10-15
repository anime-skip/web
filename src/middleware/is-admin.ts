import { useAuthStore } from '~~/stores/useAuthStore';

export default defineNuxtRouteMiddleware(() => {
  // The site is statically rendered, so redirects should be done client-side
  if (!process.client) return;

  const app = useNuxtApp();
  const auth = useAuthStore(app.$pinia);

  if (!auth.canAccessAdminDashboard) {
    return navigateTo('/account');
  }
});
