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
  const res = await supabase.auth.getSession()
  const userStore = useUserStore()

  if (res.data.session) {
    if (to.path === '/login') return '/dashboard'
    const session = res.data.session
    const metadata = session.user.user_metadata

    userStore.$state = {
      name: metadata.name,
      userName: metadata.user_name,
      avatarURL: metadata.avatar_url,
      accessToken: session.provider_token!,
    }
  }
  else if (to.path !== '/login') {
    return '/login'
  }
})

export default router
