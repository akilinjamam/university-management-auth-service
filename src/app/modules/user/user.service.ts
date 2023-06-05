import config from '../../../config/index'
import { IUser } from './user.interface'
import { User } from './user.model'
import { generatedUserId } from './user.utils'

const createUser = async (data: IUser): Promise<IUser | null> => {
  // auto generated increamental id
  const id = await generatedUserId()

  data.id = id

  // default password
  if (!data.password) {
    data.password = config.default_user_password as string
  }

  const createdUser = await User.create(data)

  if (!createdUser) {
    throw new Error('Failed to create user')
  }

  return createdUser
}

export default {
  createUser,
}
