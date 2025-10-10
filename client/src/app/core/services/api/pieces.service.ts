import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Piece } from '../../../models/piece.model';
import { API_BASE_URL } from './api';

@Injectable({ providedIn: 'root' })
export class PiecesService {
  private baseUrl = `${API_BASE_URL}/pieces`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Piece[]> {
    return this.http.get<Piece[]>(this.baseUrl);
  }

  filter(filters: Record<string, string | number>): Observable<Piece[]> {
    const params = new URLSearchParams();
    for (const key in filters) {
      if (filters[key] != null) params.set(key, filters[key].toString());
    }
    return this.http.get<Piece[]>(`${this.baseUrl}/filter?${params.toString()}`);
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
