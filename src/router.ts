import { Store } from '@/store';
import { createRouter, createWebHistory, Router, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('./pages/Home/index.vue'),
  },
  {
    path: '/sign-up',
    alias: '/log-in',
    component: () => import('./pages/LogIn/index.vue'),
  },
  {
    path: '/get-started',
    component: () => import('./pages/GetStarted/index.vue'),
  },
  {
    path: '/support',
    component: () => import('./pages/Support/index.vue'),
  },
  {
    path: '/contributing',
    component: () => import('./pages/Contributing.vue'),
  },

  {
    path: '/account',
    component: () => import('./pages/Account/index.vue'),
    meta: {
      authenticated: true,
    },
    children: [
      {
        path: '',
        component: () => import('./pages/Account/AccountInfo.vue'),
      },
      {
        path: 'email-verification',
        component: () => import('./pages/Account/EmailVerification.vue'),
      },
    ],
  },

  {
    path: '/policies/privacy-policy',
    component: () => import('./pages/PrivacyPolicy.vue'),
  },

  /* 404 */

  {
    path: '/:catchAll(.*)',
    component: () => import('./pages/404.vue'),
  },
];

export default function initializeRouter(store: Store): Router {
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
  });
  router.beforeEach((to, _, next) => {
    if (!to.meta.authenticated || store.getters.IS_SIGNED_IN) {
      return next();
    }

    next({
      path: '/log-in',
      query: {
        redirect: to.fullPath,
      },
    });
  });
  return router;
}
