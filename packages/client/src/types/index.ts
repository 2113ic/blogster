import type { Endpoints } from '@octokit/types'

export type GetResponse<T extends keyof Endpoints> = Endpoints[T]['response']
export type GetResponseData<T extends keyof Endpoints> = Endpoints[T]['response']['data']
