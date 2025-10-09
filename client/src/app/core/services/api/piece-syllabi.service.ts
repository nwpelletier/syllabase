import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PieceWithDetails } from '../../../models/piece-with-details.model';
import { API_BASE_URL } from './api';

@Injectable({ providedIn: 'root' })
export class PieceSyllabiService {
  private baseUrl = `${API_BASE_URL}/piece-syllabi`;

  constructor(private http: HttpClient) {}

  getDetails(): Observable<PieceWithDetails[]> {
    return this.http.get<PieceWithDetails[]>(`${this.baseUrl}/details`);
  }

  addPieceSyllabiByIds(
    pieceId: number | null,
    collectionId: number | null,
    syllabusId: number,
    gradeId: number
  ): Observable<PieceWithDetails> {
    const payload = { pieceId, collectionId, syllabusId, gradeId };
    return this.http.post<PieceWithDetails>(this.baseUrl, payload);
  }
}
