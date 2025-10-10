import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Composer } from '../../../models/composer.model';
import { API_BASE_URL } from './api';

@Injectable({ providedIn: 'root' })
export class ComposersService {
  private baseUrl = `${API_BASE_URL}/composers`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Composer[]> {
    return this.http.get<Composer[]>(this.baseUrl);
  }

  filter(filters: Record<string, string | number>): Observable<Composer[]> {
    const params = new URLSearchParams();
    for (const key in filters) {
      if (filters[key] != null) params.set(key, filters[key].toString());
    }
    return this.http.get<Composer[]>(`${this.baseUrl}/filter?${params.toString()}`);
  }

  getByEra(eraId: number): Observable<Composer[]> {
    return this.http.get<Composer[]>(`${this.baseUrl}/era/${eraId}`);
  }

  addComposer(newComposer: Composer): Observable<Composer> {
    return this.http.post<Composer>(this.baseUrl, newComposer);
  }

  createEmptyComposer(): Composer {
    return {
      id: 0,
      firstName: '',
      lastName: '',
      birthYear: null,
      deathYear: null,
      nationality: '',
    };
  }
}
