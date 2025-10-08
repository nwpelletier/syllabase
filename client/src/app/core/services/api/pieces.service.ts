import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Piece } from '../../../models/piece.model';

@Injectable({ providedIn: 'root' })
export class PiecesService {
  private baseUrl = 'http://localhost:3000/pieces';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Piece[]> {
    return this.http.get<Piece[]>(this.baseUrl);
  }

  addPiece(name: string, composerId: number): Observable<Piece> {
    return this.http.post<Piece>(this.baseUrl, { name, composerId });
  }

  createEmptyPiece(): { name: string; composerId: number | null } {
    return {
      name: '',
      composerId: null,
    };
  }
}
