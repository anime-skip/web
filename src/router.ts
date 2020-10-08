import { Store } from '@/store';
import { createRouter, createWebHistory, Router, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "home" */ './pages/Home/index.vue'),
  },
  {
    path: '/sign-up',
    alias: '/log-in',
    component: () => import(/* webpackChunkName: "sign_in" */ './pages/SignIn/index.vue'),
  },
  {
    path: '/get-started',
    component: () => import(/* webpackChunkName: "get_started" */ './pages/GetStarted/index.vue'),
  },
  {
    path: '/support',
    component: () => import(/* webpackChunkName: "support" */ './pages/Support/index.vue'),
  },

  {
    path: '/account',
    component: () => import(/* webpackChunkName: "account" */ './pages/Account/index.vue'),
    meta: {
      authenticated: true,
    },
    children: [
      {
        path: '',
        component: () =>
          import(/* webpackChunkName: "account_info" */ './pages/Account/AccountInfo.vue'),
      },
      {
        path: 'email-verification',
        component: () =>
          import(
            /* webpackChunkName: "email_verification" */ './pages/Account/EmailVerification.vue'
          ),
      },
    ],
  },

  {
    path: '/policies/privacy-policy',
    component: () => import(/* webpackChunkName: "privacy_policy" */ './pages/PrivacyPolicy.vue'),
  },

  {
    path: '/:catchAll(.*)',
    component: () => import(/* 404 */ './pages/404.vue'),
  },
];

export default function initializeRouter(store: Store): Router {
  const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
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
