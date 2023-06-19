import { IAcademicSemister } from '../academicSemister/academicSemister.interface';
import { User } from './user.model';

export const findLastStudentId = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    { id: 1 },
    { _id: 0 }
  )
    .sort({ createdAt: -1 })
    .lean();
  return lastStudent?.id ? lastStudent.id.substring(4) : undefined;
};

export const generateStudentId = async (
  academicSemester: IAcademicSemister | null
) => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0');

  //increament by 1
  const increamentedId = parseInt(currentId) + 1;
  let increamentedIdString = increamentedId.toString().padStart(5, '0');

  increamentedIdString = `${academicSemester.year.substring(2)}${
    academicSemester.code
  }${increamentedIdString}`;

  console.log(increamentedIdString);

  return increamentedIdString;
};

export const findLastFacultyId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne(
    {
      role: 'faculty',
    },
    { id: 1, _id: 0 }
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateFacultyId = async () => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0');

  const increamentedId = parseInt(currentId) + 1;
  let increamentedIdString = increamentedId.toString().padStart(5, '0');

  increamentedIdString = `F-${increamentedIdString}`;

  console.log(increamentedIdString);

  return increamentedIdString;
};
