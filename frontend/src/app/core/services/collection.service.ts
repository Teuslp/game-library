import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Game } from './game.service';

export interface CollectionItem {
  rawgId: number;
  name: string;
  backgroundImage: string;
  rating: number;
}

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  private apiUrl = `${environment.apiUrl}/collections`;

  constructor(private http: HttpClient) {}

  getMyCollection(): Observable<CollectionItem[]> {
    return this.http.get<CollectionItem[]>(this.apiUrl);
  }

  addGameToCollection(externalGameId: number, status: string): Observable<string> {
    return this.http.post(`${this.apiUrl}/add/${externalGameId}`, {}, { responseType: 'text' as 'json' }) as unknown as Observable<string>;
  }

  updateItemStatus(itemId: number, status: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${itemId}`, { status });
  }

  removeFromCollection(itemId: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/remove/${itemId}`, { responseType: 'text' as 'json' }) as unknown as Observable<string>;
  }
}
