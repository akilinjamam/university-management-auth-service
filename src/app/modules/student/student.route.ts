import express from 'express';

import { studentController } from './student.controller';
import validateRequest from '../../middleware/validateRequest';
import { studentValidation } from './student.validation';

const router = express.Router();

router.route('/').get(studentController.getAllStudents);

router
  .route('/:id')
  .get(studentController.getSingleStudentController)
  .delete(studentController.deleteStudent)
  .patch(
    validateRequest(studentValidation.updateStudentZodSchema),
    studentController.updateStudent
  );

export const studentRouter = router;
