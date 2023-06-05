import { Request, Response } from 'express'
import createUser from './user.service'

const createUserController = async (req: Request, res: Response) => {
  try {
    const { user } = req.body
    const result = await createUser.createUser(user)

    res.status(200).json({
      status: 'success',
      message: 'successfully user posted',
      result: result,
    })
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: 'failed to load',
      error: error,
    })
  }
}

export default { createUserController }
