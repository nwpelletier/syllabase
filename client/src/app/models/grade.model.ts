import { Syllabus } from './syllabus.model';

export interface Grade {
  id: number;
  grade: string;
  gradeLevel: number;
  syllabus: Syllabus;
}
