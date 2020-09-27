import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

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
    path: '/policies/privacy-policy',
    component: () => import(/* webpackChunkName: "privacy_policy" */ './pages/PrivacyPolicy.vue'),
  },

  {
    path: '/:catchAll(.*)',
    component: () => import(/* 404 */ './pages/404.vue'),
  },
];

export default createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
