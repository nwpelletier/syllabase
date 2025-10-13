import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Composer } from '../../../models/composer.model';
import { API_BASE_URL } from './api';

@Injectable({ providedIn: 'root' })
export class ComposersService {
  private baseUrl = `${API_BASE_URL}/composers`;

  constructor(private http: HttpClient) {}

  /** Get all composers */
  getAll(): Observable<Composer[]> {
    return this.http.get<Composer[]>(this.baseUrl);
  }

  /** Filter composers by arbitrary criteria, e.g., eraId */
  filter(filters: Record<string, string | number>): Observable<Composer[]> {
    const params = new URLSearchParams();
    for (const key in filters) {
      if (filters[key] != null) params.set(key, filters[key].toString());
    }
    return this.http.get<Composer[]>(`${this.baseUrl}/filter?${params.toString()}`);
  }

  /** Add a new composer */
  addComposer(composer: {
    firstName: string;
    lastName: string;
    birthYear: number | null;
    deathYear: number | null;
    nationality: string;
    eraId: number | null;
  }): Observable<Composer> {
    return this.http.post<Composer>(this.baseUrl, {
      ...composer,
      era_id: composer.eraId, // backend expects snake_case
    });
  }

  /** Returns an empty composer object for forms */
  createEmptyComposer(): {
    firstName: string;
    lastName: string;
    birthYear: number | null;
    deathYear: number | null;
    nationality: string;
    eraId: number | null;
  } {
    return {
      firstName: '',
      lastName: '',
      birthYear: null,
      deathYear: null,
      nationality: '',
      eraId: null,
    };
  }
}
