import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Collection } from '../../../models/collection.model';

@Injectable({ providedIn: 'root' })
export class CollectionsService {
  private baseUrl = 'http://localhost:3000/collections';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Collection[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      map((res) =>
        res.map((c) => ({
          id: c.id,
          name: c.name,
          composer: c.composer
            ? {
                id: c.composer.id,
                firstName: c.composer.first_name,
                lastName: c.composer.last_name,
              }
            : undefined,
        }))
      )
    );
  }

  addCollection(name: string, composerId: number): Observable<Collection> {
    return this.http.post<any>(this.baseUrl, { name, composerId }).pipe(
      map((c) => ({
        id: c.id,
        name: c.name,
        composer: c.composer
          ? {
              id: c.composer.id,
              firstName: c.composer.first_name,
              lastName: c.composer.last_name,
            }
          : undefined,
      }))
    );
  }

  createEmptyCollection(): { name: string; composerId: number | null } {
    return {
      name: '',
      composerId: null,
    };
  }
}
