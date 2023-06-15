import { Schema, model } from 'mongoose';
import {
  IAcademicSemister,
  AcademicSemesterModel,
} from './academicSemister.interface';
import {
  academicSemesterCode,
  academicSemesterMonths,
  academicSemesterTitle,
} from './academicSemester.constant';
import ApiError from '../../../errors/ApiErrors';
import status from 'http-status';

const academinSemesterSchema = new Schema<IAcademicSemister>(
  {
    title: {
      type: String,
      required: true,
      enum: academicSemesterTitle,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: academicSemesterCode,
    },
    startMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

academinSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });

  if (isExist) {
    throw new ApiError(status.CONFLICT, 'Academic semester is already exist !');
  }
  next();
});

// handling same year and same semester issue

export const AcademicSemester = model<IAcademicSemister, AcademicSemesterModel>(
  'AcademicSemester',
  academinSemesterSchema
);
