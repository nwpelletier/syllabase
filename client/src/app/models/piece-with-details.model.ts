export interface PieceWithDetails {
  pieceName: string;
  composer: string;
  collection?: string | null;
  syllabus?: string | null;
  grade?: string | null;
}
