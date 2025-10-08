import { Piece } from './piece.model';
import { Collection } from './collection.model';
import { Syllabus } from './syllabus.model';
import { Grade } from './grade.model';

export interface PieceSyllabus {
  id: number;
  piece?: Piece | null;
  collection?: Collection | null;
  syllabus: Syllabus;
  grade: Grade;
}
