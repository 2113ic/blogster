import type { Context, Next } from 'koa'
import type Router from 'koa__router'
import auth from './auth'

const routeConfig: Record<string, Router> = {
  auth,
}

export default async (ctx: Context, next: Next) => {
  for (const key in routeConfig) {
    const route = routeConfig[key]
    ctx.app.use(route.routes())
    ctx.app.use(route.allowedMethods())
  }

  await next()
}
