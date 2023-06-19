import mongoose from 'mongoose';
import config from '../../../config/index';
import ApiError from '../../../errors/ApiErrors';
import { AcademicSemester } from '../academicSemister/academinSemester.model';
import { IStudent } from '../student/student.interface';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import { Student } from '../student/student.model';
import httpStatus from 'http-status';

const createStudent = async (
  student: IStudent,
  data: IUser
): Promise<IUser | null> => {
  // default password
  if (!data.password) {
    data.password = config.default_student_password as string;
  }

  // set role
  data.role = 'student';

  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  );

  // generate id
  let newUserAllData = null;
  const seassion = await mongoose.startSession();
  try {
    seassion.startTransaction();
    const id = await generateStudentId(academicSemester);
    data.id = id;
    student.id = id;

    const newStudent = await Student.create([student], { seassion });

    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    // set student : id into user.student
    data.student = newStudent[0]._id;

    const newUser = await User.create([data], { seassion });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    newUserAllData = newUser[0];

    await seassion.commitTransaction();
    await seassion.endSession();
  } catch (error) {
    await seassion.abortTransaction();
    await seassion.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }

  return newUserAllData;
};

export const userService = {
  createStudent,
};
