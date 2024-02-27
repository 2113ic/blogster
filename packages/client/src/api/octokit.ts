import { Octokit } from '@octokit/core'

export const HEADER_API = { 'X-GitHub-Api-Version': '2022-11-28' }
export const octokit = new Octokit({
  auth: import.meta.env.VITE_GITHUB_ACCESS_TOKEN,
})
