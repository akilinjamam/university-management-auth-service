import express from 'express'
import userController from './user.controller'
const router = express.Router()

router.route('/create-user').post(userController.createUserController)

export default router
