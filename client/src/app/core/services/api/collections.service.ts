import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Collection } from '../../../models/collection.model';
import { API_BASE_URL } from './api';

@Injectable({ providedIn: 'root' })
export class CollectionsService {
  private baseUrl = `${API_BASE_URL}/collections`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Collection[]> {
    return this.http.get<Collection[]>(this.baseUrl);
  }

  addCollection(name: string, composerId: number): Observable<Collection> {
    return this.http.post<Collection>(this.baseUrl, { name, composerId });
  }

  createEmptyCollection(): { name: string; composerId: number | null } {
    return {
      name: '',
      composerId: null,
    };
  }
}
