import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    id: '',
    name: '',
    userName: '',
    avatarURL: '/logo.png',
  }),
})
