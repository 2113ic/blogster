import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/views/login.vue'),
    },
    {
      path: '/home',
      component: () => import('@/views/home.vue'),
    },
  ],
})
