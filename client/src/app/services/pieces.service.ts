import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PiecesService {
  private baseUrl = 'http://localhost:3000/pieces';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  add(piece: any): Observable<any> {
    return this.http.post(this.baseUrl, piece);
  }
}
