import { Request, Response } from 'express';
import { userService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendRespone from '../../../shared/sendResponse';
import httpStatus from 'http-status';
// import { z } from 'zod'

const createStudentController = catchAsync(
  async (req: Request, res: Response) => {
    const { student, ...userData } = req.body;
    const result = await userService.createStudent(student, userData);

    sendRespone(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user created successfully',
      data: result,
    });
  }
);

export const userController = {
  createStudentController,
};
