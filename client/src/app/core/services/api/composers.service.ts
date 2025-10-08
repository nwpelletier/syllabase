import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Composer } from '../../../models/composer.model';

@Injectable({ providedIn: 'root' })
export class ComposersService {
  private baseUrl = 'http://localhost:3000/composers';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Composer[]> {
    return this.http
      .get<any[]>(this.baseUrl)
      .pipe(map((res) => res.map((c) => this.mapComposer(c))));
  }

  addComposer(newComposer: Composer): Observable<Composer> {
    const payload = {
      first_name: newComposer.firstName,
      last_name: newComposer.lastName,
      birth_year: newComposer.birthYear,
      death_year: newComposer.deathYear,
      nationality: newComposer.nationality,
    };
    return this.http.post<any>(this.baseUrl, payload).pipe(map((c) => this.mapComposer(c)));
  }

  private mapComposer(c: any): Composer {
    return {
      id: c.id,
      firstName: c.first_name,
      lastName: c.last_name,
      birthYear: c.birth_year,
      deathYear: c.death_year,
      nationality: c.nationality,
    };
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
