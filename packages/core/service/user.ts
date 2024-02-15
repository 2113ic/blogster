import type { UserDocument } from '../model/user'
import User from '../model/user'

class UserService {
  async createUser(username: string, password: string): Promise<UserDocument> {
    const newUser = new User({ username, password })
    return await newUser.save()
  }

  async findUser(username: string, password: string): Promise<UserDocument | null> {
    return await User.findOne({ username, password }).exec()
  }
}

export default new UserService()
