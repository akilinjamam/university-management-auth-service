import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendRespone from '../../../shared/sendResponse';

import { Request, Response } from 'express';
import pick from '../../../shared/pick';

import { paginationFields } from '../../../constants/pagination';
import { academicDepartmentService } from './academicDepartment.service';
import { academicDepartmentFilterableFields } from './academicDepartment.constant';
import { IAcademicDepartment } from './academicDepartment.interface';

const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicDepartmentData } = req.body;

    const result = await academicDepartmentService.creatAcademicDepartment(
      academicDepartmentData
    );

    sendRespone(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'academic Department created successfully',
      data: result,
    });
  }
);

const getAllDepartment = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicDepartmentFilterableFields);
  const paginationOption = pick(req.query, paginationFields);

  console.log(filters);

  const result = await academicDepartmentService.getAcademicDepartment(
    filters,
    paginationOption
  );

  sendRespone<IAcademicDepartment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic Department found successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await academicDepartmentService.getSingleDepartmentService(id);

  sendRespone<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic Department found successfully',
    data: result,
  });
});

const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;
  const result = await academicDepartmentService.updateDepartmentService(
    id,
    updateData
  );

  sendRespone<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic Department updated successfully',
    data: result,
  });
});
const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await academicDepartmentService.deleteDepartmentService(id);

  sendRespone<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic Department deleted successfully',
    data: result,
  });
});

export const academicDepartmentController = {
  createAcademicDepartment,
  getAllDepartment,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
