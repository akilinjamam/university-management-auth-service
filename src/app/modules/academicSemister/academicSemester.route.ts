import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { academicSemesterValidation } from './academinSemester.validation';
import { academicSemesterController } from './academicSemester.controller';
const router = express.Router();

router
  .route('/create-semester')
  .post(
    validateRequest(academicSemesterValidation.createAcademicSemesterZodSchema),
    academicSemesterController.createAcademicSemester
  );

router.route('/').get(academicSemesterController.getAllSemester);

router
  .route('/:id')
  .get(academicSemesterController.getSingleSemester)
  .patch(
    validateRequest(academicSemesterValidation.updateAcademicSemesterZodSchema),
    academicSemesterController.updateSemester
  )
  .delete(academicSemesterController.deleteSemester);

export const academicSemesterRouter = router;
