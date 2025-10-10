import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Era } from '../../../models/era.model';
import { API_BASE_URL } from './api';

@Injectable({ providedIn: 'root' })
export class ErasService {
  private baseUrl = `${API_BASE_URL}/eras`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Era[]> {
    return this.http.get<Era[]>(this.baseUrl);
  }
}
