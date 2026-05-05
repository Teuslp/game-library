import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface LoginRequest {
  email: string;
  password?: string;
  login?: string;
}

export interface AuthResponse {
  token: string;
}

export interface User {
  id: number;
  login: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/auth`;
  
  private currentUserState = signal<User | null>(null);
  public currentUser = this.currentUserState.asReadonly();

  constructor() {
    this.checkToken();
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response.token) {
          this.setToken(response.token);
          this.checkToken();
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.currentUserState.set(null);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  private setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  private checkToken(): void {
    const token = this.getToken();
    if (token) {
      // Decode JWT to get user info if needed, or simply assume logged in
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.currentUserState.set({
          id: payload.id || 0,
          login: payload.sub || '',
          role: payload.role || 'USER'
        });
      } catch (e) {
        this.logout();
      }
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
