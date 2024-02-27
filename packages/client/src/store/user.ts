import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    avatar_url: '/logo.png',
    user_name: '',
    name: '',
  }),
})
