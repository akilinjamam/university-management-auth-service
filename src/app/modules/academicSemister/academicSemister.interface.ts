import { Model } from 'mongoose';

export type IAacademicSemesterMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type IAacademicSemesterTitle = 'Autumn' | 'Summer' | 'Fall';

export type IAacademicSemesterCode = '01' | '02' | '03';

export type IAcademicSemister = {
  title: IAacademicSemesterTitle;
  year: string;
  code: IAacademicSemesterCode;
  startMonth: IAacademicSemesterMonth;
  endMonth: IAacademicSemesterMonth;
};

export type AcademicSemesterModel = Model<IAcademicSemister>;

export type IAcademicSemisterFilter = {
  searchTerm?: string;
};
