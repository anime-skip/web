import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'ComingSoon',
    component: () => import(/* webpackChunkName: "coming_soon" */ './pages/ComingSoon.vue'),
  },
  {
    path: '/sign-up',
    alias: '/sign-in',
    name: 'SignIn',
    component: () => import(/* webpackChunkName: "sign_in" */ './pages/SignIn/index.vue'),
  },
  {
    path: '/get-started',
    name: 'GetStarted',
    component: () => import(/* webpackChunkName: "get_started" */ './pages/GetStarted/index.vue'),
  },
];

export default createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
