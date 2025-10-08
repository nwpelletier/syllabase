import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { PieceWithDetails } from '../../../models/piece-with-details.model';

export interface PieceSyllabusPayload {
  pieceId: number | null;
  collectionId: number | null;
  syllabusId: number;
  gradeId: number;
}

@Injectable({ providedIn: 'root' })
export class PieceSyllabiService {
  private baseUrl = 'http://localhost:3000/piece-syllabi';

  constructor(private http: HttpClient) {}

  getDetails(): Observable<PieceWithDetails[]> {
    return this.http.get<any[]>(`${this.baseUrl}/details`).pipe(
      map((res) =>
        res.map((item) => ({
          pieceName: item.pieceName,
          composer: item.composer,
          collection: item.collection,
          syllabus: item.syllabus,
          grade: item.grade,
        }))
      )
    );
  }

  addPieceSyllabiByIds(
    pieceId: number | null,
    collectionId: number | null,
    syllabusId: number,
    gradeId: number
  ): Observable<PieceWithDetails> {
    const payload = { pieceId, collectionId, syllabusId, gradeId };
    return this.http.post<any>(this.baseUrl, payload).pipe(
      map((item) => ({
        pieceName: item.piece_name,
        composer: item.composer_name,
        collection: item.collection_name,
        syllabus: item.syllabus_name,
        grade: item.grade,
      }))
    );
  }
}
