import type { GetResponseData } from './index'

export type Aritcles = GetResponseData<'GET /repos/{owner}/{repo}/contents/{path}'>

export type SubAritcles = SubAritcle[]
export interface SubAritcle {
  name: string
  path: string
  sha: string
  size: number
  content: string
  meta: AritcleMeta
  download_url?: string
}

export interface ArticleItemProps {
  name: string
  data: {
    title: string
    description: string
    cover: string
    date: string
    publish: string
    tags: string[]
  }
}

export interface AritcleMeta {
  title: string
  date: string
  publish: string
  tags: string[]
  description: string
  cover: string
}
