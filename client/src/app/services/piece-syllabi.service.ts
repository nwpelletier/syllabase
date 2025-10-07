import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PieceSyllabiService {
  private baseUrl = 'http://localhost:3000/piece-syllabi';

  constructor(private http: HttpClient) {}

  getDetails(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/details`);
  }

  add(entry: any): Observable<any> {
    return this.http.post(this.baseUrl, entry);
  }
}
