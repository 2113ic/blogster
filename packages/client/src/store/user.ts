import { defineStore } from 'pinia'

interface UserState {
  id: string
  name?: string
  userName?: string
  avatarURL?: string
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    id: '',
    name: '',
    userName: '',
    avatarURL: '',
  }),
})
