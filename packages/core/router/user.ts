import Router from '@koa/router'
import auth from '../controller/auth'

const router = new Router()

router.post('/user/login', auth.login)
router.post('/user/logout', auth.logout)

export default router
