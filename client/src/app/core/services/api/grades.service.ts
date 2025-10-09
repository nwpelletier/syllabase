import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Grade } from '../../../models/grade.model';
import { API_BASE_URL } from './api';

@Injectable({ providedIn: 'root' })
export class GradesService {
  private baseUrl = `${API_BASE_URL}/grades`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Grade[]> {
    return this.http.get<Grade[]>(this.baseUrl);
  }
}
