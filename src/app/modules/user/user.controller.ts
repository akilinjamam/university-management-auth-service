import { Request, Response } from 'express';
import { userService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendRespone from '../../../shared/sendResponse';
import httpStatus from 'http-status';
// import { z } from 'zod'

const createUserController = catchAsync(async (req: Request, res: Response) => {
  const { user } = req.body;
  const result = await userService.createUser(user);

  sendRespone(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user created successfully',
    data: result,
  });
});

export const userController = {
  createUserController,
};
