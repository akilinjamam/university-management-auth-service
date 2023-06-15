import { academicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import sendRespone from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { academicSemesterFilterableFields } from './academicSemester.constant';
import { IAcademicSemister } from './academicSemister.interface';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicSemesterData } = req.body;

    const result = await academicSemesterService.creatAcademicSemester(
      academicSemesterData
    );

    sendRespone(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'academic semester created successfully',
      data: result,
    });
  }
);

const getAllSemester = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicSemesterFilterableFields);
  const paginationOption = pick(req.query, paginationFields);

  console.log(filters);

  const result = await academicSemesterService.getAcademicSemester(
    filters,
    paginationOption
  );

  sendRespone<IAcademicSemister[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic semester found successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await academicSemesterService.getSingleSemesterService(id);

  sendRespone<IAcademicSemister>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic semester found successfully',
    data: result,
  });
});

const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;
  const result = await academicSemesterService.updateSemesterService(
    id,
    updateData
  );

  sendRespone<IAcademicSemister>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic semester updated successfully',
    data: result,
  });
});
const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await academicSemesterService.deleteSemesterService(id);

  sendRespone<IAcademicSemister>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic semester updated successfully',
    data: result,
  });
});

export const academicSemesterController = {
  createAcademicSemester,
  getAllSemester,
  getSingleSemester,
  updateSemester,
  deleteSemester,
};
