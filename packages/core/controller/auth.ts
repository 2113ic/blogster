import type { Context } from 'koa'
import type { UserDocument } from '../model/user'
import userService from '../service/user'

class AuthController {
  async login(ctx: Context): Promise<void> {
    const { username, password } = ctx.request.body as UserDocument

    try {
      const user = await userService.findUser(username, password)
      if (user) {
        ctx.status = 200
        ctx.body = { message: '登录成功', user }
      }
      else {
        ctx.status = 401
        ctx.body = { message: '用户名或密码错误' }
      }
    }
    catch (error) {
      ctx.status = 500
      ctx.body = { message: '登录失败', error: error.message }
    }
  }

  async logout(ctx: Context): Promise<void> {
    const { username, password } = ctx.request.body as UserDocument

    try {
      const user = await userService.createUser(username, password)
      ctx.status = 201
      ctx.body = { message: '注册成功', user }
    }
    catch (error) {
      ctx.status = 500
      ctx.body = { message: '注册失败', error: error.message }
    }
  }
}

export default new AuthController()
