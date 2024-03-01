import { Octokit } from '@octokit/core'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()

export const HEADER_API = { 'X-GitHub-Api-Version': '2022-11-28' }
export const octokit = new Octokit({
  auth: userStore.accessToken,
})
