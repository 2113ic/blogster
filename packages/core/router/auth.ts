import Router from '@koa/router'
import supabase from '../supabase'

const route = new Router()

export default route.get('/auth', async () => {
  return await supabase.auth
    .signInWithOAuth({ provider: 'github' })
})
