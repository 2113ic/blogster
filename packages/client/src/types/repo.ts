import type { GetResponseData } from './index'

export type Repos = GetResponseData<'GET /user/repos'>

export interface SbRepo {
  node_id: string
  metadata: Repos[0]
}

export type SbRepos = SbRepo[]
export interface SbProjectResponse extends SbRepo {
  id: number
  uid: string
}
