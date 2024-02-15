import type { Context, Next } from 'koa'
import type Router from 'koa__router'

import user from './user'

const routeConfig: Record<string, Router> = {
  user
}

export default async (ctx: Context, next: Next) => {
  for (const key in routeConfig) {
    const route = routeConfig[key]
    ctx.app.use(route.routes())
    ctx.app.use(route.allowedMethods())
  }

  await next()
}
