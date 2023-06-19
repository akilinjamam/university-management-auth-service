import express from 'express';
import { userRouter } from '../modules/user/user.router';
import { academicSemesterRouter } from '../modules/academicSemister/academicSemester.route';
import { academicFacultyRouter } from '../modules/academicFaculty/academicFaculty.route';
import { academicDepartmentRouter } from '../modules/academicDepartment/academicDepartment.route';
import { studentRouter } from '../modules/student/student.route';
const router = express.Router();

const moduleRouter = [
  {
    path: '/users',
    route: userRouter,
  },
  {
    path: '/academic-semesters',
    route: academicSemesterRouter,
  },
  {
    path: '/academic-faculties',
    route: academicFacultyRouter,
  },
  {
    path: '/academic-departments',
    route: academicDepartmentRouter,
  },
  {
    path: '/students',
    route: studentRouter,
  },
];

moduleRouter.forEach(route => router.use(route.path, route.route));

export default router;
