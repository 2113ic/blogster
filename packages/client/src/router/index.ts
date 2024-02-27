import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/store/user'
import supabase from '@/api/supabase'

const homeChildren = import.meta.glob('../views/home/*.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/Login.vue'),
    },
    {
      path: '/',
      redirect: '/dashboard',
      component: () => import('@/views/Home.vue'),
      children: Object.keys(homeChildren).map((path) => {
        return {
          path: path.match(/\/(\w+)\.vue$/)?.[1] || '',
          component: homeChildren[path],
        }
      }),
    },
  ],
})

router.beforeEach(async (to) => {
  const { data: { session } } = await supabase.auth.getSession()
  const userStore = useUserStore()

  if (session) {
    if (to.path === '/login') return '/dashboard'
    const { avatar_url, user_name, name } = session!.user.user_metadata
    userStore.$state = { avatar_url, user_name, name }
  }
  else if (to.path !== '/login') {
    return '/login'
  }
})

export default router
