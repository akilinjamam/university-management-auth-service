import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendRespone from '../../../shared/sendResponse';
import { academicFacultyService } from './academicFaculty.service';
import { Request, Response } from 'express';
import pick from '../../../shared/pick';
import { academicFacultyFilterableFields } from './academicFaculty.constant';
import { paginationFields } from '../../../constants/pagination';
import { IAcademicFaculty } from './academicFaculty.interface';

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicFacultyData } = req.body;

    const result = await academicFacultyService.creatAcademicFaculty(
      academicFacultyData
    );

    sendRespone(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'academic Faculty created successfully',
      data: result,
    });
  }
);

const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicFacultyFilterableFields);
  const paginationOption = pick(req.query, paginationFields);

  console.log(filters);

  const result = await academicFacultyService.getAcademicFaculty(
    filters,
    paginationOption
  );

  sendRespone<IAcademicFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic Faculty found successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await academicFacultyService.getSingleFacultyService(id);

  sendRespone<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic Faculty found successfully',
    data: result,
  });
});

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;
  const result = await academicFacultyService.updateFacultyService(
    id,
    updateData
  );

  sendRespone<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic Faculty updated successfully',
    data: result,
  });
});
const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await academicFacultyService.deleteFacultyService(id);

  sendRespone<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic Faculty updated successfully',
    data: result,
  });
});

export const academicFacultyController = {
  createAcademicFaculty,
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
