import { User } from './user.model'

export const findLastuser = async () => {
  const lastuser = await User.findOne({}, { id: 1 }, { _id: 0 })
    .sort({ createdAt: -1 })
    .lean()
  return lastuser?.id
}

export const generatedUserId = async () => {
  const currentId = (await findLastuser()) || (0).toString().padStart(5, '0')

  //increament by 1
  const increamentedId = parseInt(currentId) + 1
  const increamentedIdString = increamentedId.toString().padStart(5, '0')

  return increamentedIdString
}
