import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CollectionsService {
  private baseUrl = 'http://localhost:3000/collections';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  add(collection: any): Observable<any> {
    return this.http.post(this.baseUrl, collection);
  }
}
