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
      redirect: 'home/dashboard',
      children: [
        {
          path: 'dashboard',
          component: () => import('@/views/home/Dashboard.vue'),
        },
        {
          path: 'article',
          component: () => import('@/views/home/Article.vue'),
        },
        {
          path: 'plugin',
          component: () => import('@/views/home/Plugin.vue'),
        },
        {
          path: 'setting',
          component: () => import('@/views/home/Setting.vue'),
        },
      ],
    },
  ],
})
