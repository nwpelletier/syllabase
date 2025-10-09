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
