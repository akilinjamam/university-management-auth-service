import { z } from 'zod';
import { bloodGroup, gender } from '../student/student.constant';

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'firstName is required',
        }),
        middleName: z.string().optional(),
        lastName: z
          .string({
            required_error: 'firstName is required',
          })
          .optional(),
      }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'gender is required',
      }),
      dateOfBirth: z.string({
        required_error: 'Date of birth is required',
      }),
      email: z.string({
        required_error: 'email is required',
      }),
      contactNo: z.string({
        required_error: 'contact number is required',
      }),
      emergencyContactNo: z.string({
        required_error: 'emergency contact number is required',
      }),
      presentAddress: z.string({
        required_error: 'presentAddress  is required',
      }),
      permanentAddress: z.string({
        required_error: 'permanentAddress  is required',
      }),
      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
      guardian: z.object({
        fatherName: z.string({
          required_error: 'fatherName is required',
        }),
        fatherOccupation: z.string({
          required_error: 'fatherOccupation is required',
        }),
        fatherContactNo: z.string({
          required_error: 'fatherContactNo is required',
        }),
        motherName: z.string({
          required_error: 'motherName is required',
        }),
        motherOccupation: z.string({
          required_error: 'motherOccupation is required',
        }),
        motherContactNo: z.string({
          required_error: 'motherContactNo is required',
        }),
        address: z.string({
          required_error: 'address is required',
        }),
      }),
      localGuardian: z.object({
        name: z.string({
          required_error: 'local guardian name is required',
        }),
        occupation: z.string({
          required_error: ' localGuardian occupation is required',
        }),
        contactNo: z.string({
          required_error: ' localGuardian contact number is required',
        }),
        address: z.string({
          required_error: 'localGuardian address is required',
        }),
      }),
      profileImage: z.string().optional(),
      academicSemester: z.string({
        required_error: 'academic semester is required',
      }),
      academicFaculty: z.string({
        required_error: 'academic faculty is required',
      }),
      academicDepartment: z.string({
        required_error: 'academic department is required',
      }),
    }),
  }),
});

export const UserValidation = {
  createUserZodSchema,
};
