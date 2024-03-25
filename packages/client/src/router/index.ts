import type { RouteRecordRaw } from 'vue-router'
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
      children: Object.keys(homeChildren).map<RouteRecordRaw>((path) => {
        const pathName = path.match(/\/(\w+)\.vue$/)?.[1] || ''
        if (pathName === 'Dashboard') {
          return {
            path: pathName,
            component: homeChildren[path],
            beforeEnter(to) {
              if (to.hash.startsWith('#access_token'))
                return '/dashboard'
            },
          }
        }

        return {
          path: pathName,
          component: homeChildren[path],
        }
      }),
    },
  ],
})

router.beforeEach(async (to) => {
  const res = await supabase.auth.getSession()

  if (res.data.session) {
    if (to.path === '/login') return '/dashboard'
    const session = res.data.session
    const metadata = session.user.user_metadata
    const userStore = useUserStore()

    if (session.provider_token)
      localStorage.setItem('gh-access-token', session.provider_token)

    userStore.$patch({
      id: session.user.id,
      name: metadata.name,
      owner: metadata.user_name,
      avatarURL: metadata.avatar_url,
    })
  }
  else if (to.path !== '/login') {
    return '/login'
  }
})

export default router
