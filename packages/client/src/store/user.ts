import { defineStore } from 'pinia'

interface UserState {
  id: string
  name?: string
  owner?: string
  avatarURL?: string
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    id: '',
    name: '',
    owner: '',
    avatarURL: '',
  }),
})
