import express from 'express';

import validateRequest from '../../middleware/validateRequest';
import { academicDepartmentValidation } from './academicDepartment.validation';
import { academicDepartmentController } from './academicDepartment.controller';

const router = express.Router();

router
  .route('/create-department')
  .post(
    validateRequest(
      academicDepartmentValidation.createAcademicDepartmentZodSchema
    ),
    academicDepartmentController.createAcademicDepartment
  );

router.route('/').get(academicDepartmentController.getAllDepartment);

router
  .route('/:id')
  .get(academicDepartmentController.getSingleDepartment)
  .patch(
    validateRequest(
      academicDepartmentValidation.updateAcademicDepartmentZodSchema
    ),
    academicDepartmentController.updateDepartment
  )
  .delete(academicDepartmentController.deleteDepartment);

export const academicDepartmentRouter = router;
