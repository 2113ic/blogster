import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    name: '',
    userName: '',
    avatarURL: '/logo.png',
  }),
})
