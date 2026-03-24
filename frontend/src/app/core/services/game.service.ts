import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Game {
  id: number;
  externalId?: number;
  title?: string;
  name?: string;
  description?: string;
  imageUrl?: string;
  background_image?: string;
  releaseDate?: string;
  released?: string;
}

export interface GameSearchResponse {
  results: Game[];
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  searchGames(query: string): Observable<any> {
    const params = new HttpParams().set('name', query);
    // Supposing backend has /games/search or similar. Adjusting to common pattern:
    return this.http.get<Game[]>(`${this.apiUrl}/games/search`, { params });
  }

  getGameDetails(id: number): Observable<Game> {
    return this.http.get<Game>(`${this.apiUrl}/games/${id}`);
  }
}
