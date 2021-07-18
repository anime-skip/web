import { Store } from '@/store';
import { createRouter, createWebHistory, Router, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('./pages/Home/index.vue'),
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
    path: '/api',
    component: () => import('./pages/Api.vue'),
  },

  /* Policies */

  {
    path: '/policies/privacy-policy',
    component: () => import('./pages/PrivacyPolicy.vue'),
  },

  /* Authentication Pages */

  {
    path: '/log-in',
    component: () => import('./pages/LogIn/index.vue'),
    children: [
      {
        path: '',
        component: () => import('./pages/LogIn/LogInForm.vue'),
      },
    ],
  },
  {
    path: '/sign-up',
    component: () => import('./pages/LogIn/index.vue'),
    children: [
      {
        path: '',
        component: () => import('./pages/LogIn/SignUpForm.vue'),
      },
    ],
  },
  {
    path: '/forgot-password',
    component: () => import('./pages/LogIn/index.vue'),
    children: [
      {
        path: '',
        component: () => import('./pages/LogIn/ForgotPasswordForm.vue'),
      },
    ],
  },
  {
    path: '/log-out',
    component: () => import('./pages/LogIn/index.vue'),
    children: [
      {
        path: '',
        component: () => import('./pages/LogIn/LogOut.vue'),
      },
    ],
  },

  /* Account Management */

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
        path: 'security',
        component: () => import('./pages/Account/Security.vue'),
      },
      {
        path: 'email-verification',
        component: () => import('./pages/Account/EmailVerification.vue'),
      },
    ],
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
    scrollBehavior() {
      return { top: 0, left: 0 };
    },
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
