import type { Endpoints } from '@octokit/types'

export type GetResponseData<T extends keyof Endpoints> = Endpoints[T]['response']['data']
