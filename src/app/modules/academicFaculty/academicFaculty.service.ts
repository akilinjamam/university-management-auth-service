import {
  IAcademicFaculty,
  IAcademicFacultyFilter,
} from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';
import { IPaginationOption } from '../../../interfaces/pagenationOption';
import { IGenericResponse } from '../../../interfaces/common';
import { academicFacultySearchableFields } from './academicFaculty.constant';
import { paginationHelper } from '../../../helper/paginationHelper';
import { SortOrder } from 'mongoose';

const creatAcademicFaculty = async (
  payLoad: IAcademicFaculty
): Promise<IAcademicFaculty> => {
  const result = await AcademicFaculty.create(payLoad);

  return result;
};

const getAcademicFaculty = async (
  filters: IAcademicFacultyFilter,
  paginationOption: IPaginationOption
): Promise<IGenericResponse<IAcademicFaculty[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: academicFacultySearchableFields.map(field => ({
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

  const result = await AcademicFaculty.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await AcademicFaculty.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleFacultyService = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findById(id);

  return result;
};

const updateFacultyService = async (
  id: string,
  payLoad: Partial<IAcademicFaculty>
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payLoad, {
    new: true,
  });

  return result;
};

const deleteFacultyService = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findByIdAndDelete(id);

  return result;
};

export const academicFacultyService = {
  creatAcademicFaculty,
  getAcademicFaculty,
  getSingleFacultyService,
  updateFacultyService,
  deleteFacultyService,
};
