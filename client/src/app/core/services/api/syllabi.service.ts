import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Syllabus } from '../../../models/syllabus.model';
import { API_BASE_URL } from './api';

@Injectable({ providedIn: 'root' })
export class SyllabiService {
  private baseUrl = `${API_BASE_URL}/syllabi`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Syllabus[]> {
    return this.http.get<Syllabus[]>(this.baseUrl);
  }
}
