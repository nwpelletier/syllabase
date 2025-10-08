import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Piece } from '../../../models/piece.model';

@Injectable({ providedIn: 'root' })
export class PiecesService {
  private baseUrl = 'http://localhost:3000/pieces';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Piece[]> {
    return this.http
      .get<any[]>(this.baseUrl)
      .pipe(map((pieces) => pieces.map((p) => this.mapPiece(p))));
  }

  addPiece(name: string, composerId: number): Observable<Piece> {
    const payload = { name, composerId };
    return this.http.post<any>(this.baseUrl, payload).pipe(map((p) => this.mapPiece(p)));
  }

  private mapPiece(p: any): Piece {
    return {
      id: p.id,
      name: p.name,
      composer: p.composer
        ? {
            id: p.composer.id,
            firstName: p.composer.first_name,
            lastName: p.composer.last_name,
          }
        : undefined,
    };
  }

  createEmptyPiece(): { name: string; composerId: number | null } {
    return {
      name: '',
      composerId: null,
    };
  }
}
