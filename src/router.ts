import { createRouter, createWebHistory } from 'vue-router'


export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'home',
      path: '/',
      component: () => import('./pages/Home.vue')
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('./pages/Login.vue')
    },
    {
      name: 'register',
      path: '/register',
      component: () => import('./pages/Register.vue')
    }
  ]
})