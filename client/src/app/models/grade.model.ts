import { Syllabus } from './syllabus.model';

export interface Grade {
  id: number;
  syllabus?: Syllabus;
  grade: string;
  grade_level: number;
}
