import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Grade } from '../../../models/grade.model';

@Injectable({ providedIn: 'root' })
export class GradesService {
  private baseUrl = 'http://localhost:3000/grades';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Grade[]> {
    return this.http.get<Grade[]>(this.baseUrl);
  }
}
