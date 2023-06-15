import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiErrors';
import {
  academicSemesterSearchableFields,
  academicSemesterTitleCodeMapper,
} from './academicSemester.constant';
import {
  IAcademicSemister,
  IAcademicSemisterFilter,
} from './academicSemister.interface';
import { AcademicSemester } from './academinSemester.model';
import { IPaginationOption } from '../../../interfaces/pagenationOption';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelper } from '../../../helper/paginationHelper';
import { SortOrder } from 'mongoose';

const creatAcademicSemester = async (
  payLoad: IAcademicSemister
): Promise<IAcademicSemister> => {
  if (academicSemesterTitleCodeMapper[payLoad.title] !== payLoad.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invelid semester code');
  }

  const result = await AcademicSemester.create(payLoad);

  return result;
};

const getAcademicSemester = async (
  filters: IAcademicSemisterFilter,
  paginationOption: IPaginationOption
): Promise<IGenericResponse<IAcademicSemister[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: academicSemesterSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  console.log(Object.entries(filtersData));

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOption);

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await AcademicSemester.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await AcademicSemester.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleSemesterService = async (
  id: string
): Promise<IAcademicSemister | null> => {
  const result = await AcademicSemester.findById(id);

  return result;
};

const updateSemesterService = async (
  id: string,
  payLoad: Partial<IAcademicSemister>
): Promise<IAcademicSemister | null> => {
  if (
    payLoad.title &&
    payLoad.code &&
    academicSemesterTitleCodeMapper[payLoad.title] !== payLoad.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code');
  }

  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payLoad, {
    new: true,
  });

  return result;
};

const deleteSemesterService = async (
  id: string
): Promise<IAcademicSemister | null> => {
  const result = await AcademicSemester.findByIdAndDelete(id);

  return result;
};

export const academicSemesterService = {
  creatAcademicSemester,
  getAcademicSemester,
  getSingleSemesterService,
  updateSemesterService,
  deleteSemesterService,
};
