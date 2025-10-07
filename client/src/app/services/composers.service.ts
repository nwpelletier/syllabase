import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ComposersService {
  private baseUrl = 'http://localhost:3000/composers';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  add(composer: any): Observable<any> {
    return this.http.post(this.baseUrl, composer);
  }
}
