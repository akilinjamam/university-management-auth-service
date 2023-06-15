import express from 'express';
import { academicFacultyValidation } from './academicFaculty.validation';
import { academicFacultyController } from './academicFaculty.controller';
import validateRequest from '../../middleware/validateRequest';

const router = express.Router();

router
  .route('/create-faculty')
  .post(
    validateRequest(academicFacultyValidation.createAcademicFacultyZodSchema),
    academicFacultyController.createAcademicFaculty
  );

router.route('/').get(academicFacultyController.getAllFaculty);

router
  .route('/:id')
  .get(academicFacultyController.getSingleFaculty)
  .patch(
    validateRequest(academicFacultyValidation.updateAcademicFacultyZodSchema),
    academicFacultyController.updateFaculty
  )
  .delete(academicFacultyController.deleteFaculty);

export const academicFacultyRouter = router;
