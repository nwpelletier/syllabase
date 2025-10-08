import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Syllabus } from '../../../models/syllabus.model';

@Injectable({ providedIn: 'root' })
export class SyllabiService {
  private baseUrl = 'http://localhost:3000/syllabi';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Syllabus[]> {
    return this.http.get<Syllabus[]>(this.baseUrl);
  }
}
