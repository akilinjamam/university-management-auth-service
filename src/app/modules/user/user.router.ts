import express from 'express';
import { userController } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from './user.validation';

const router = express.Router();

router
  .route('/create-student')
  .post(
    validateRequest(UserValidation.createUserZodSchema),
    userController.createStudentController
  );

export const userRouter = router;
