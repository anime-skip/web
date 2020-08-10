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
    path: '/getting-started',
    name: 'GettingStarted',
    component: () => import(/* webpackChunkName: "getting_started" */ './pages/GettingStarted.vue'),
  },
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: () => import(/* webpackChunkName: "home" */ './pages/Home.vue')
  // }
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import(/* webpackChunkName: "about" */ './pages/About.vue')
  // }
];

export default createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
