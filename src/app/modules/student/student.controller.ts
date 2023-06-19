import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import sendRespone from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';

import { IStudent } from './student.interface';
import { studentFilterableFields } from './student.constant';
import { paginationFields } from '../../../constants/pagination';
import { StudentService } from './student.service';

const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentFilterableFields);
  const paginationOption = pick(req.query, paginationFields);

  console.log(filters);

  const result = await StudentService.getAllStudentsService(
    filters,
    paginationOption
  );

  sendRespone<IStudent[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student found successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleStudentController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await StudentService.getSingleStudentService(id);

    sendRespone<IStudent>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'student found successfully',
      data: result,
    });
  }
);

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;
  const result = await StudentService.updateStudentService(id, updateData);

  sendRespone<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student updated successfully',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await StudentService.deleteStudentService(id);

  sendRespone<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student updated successfully',
    data: result,
  });
});

export const studentController = {
  getAllStudents,
  getSingleStudentController,
  updateStudent,
  deleteStudent,
};
