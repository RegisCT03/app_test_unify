import { Injectable } from '@angular/core';
import { ApiService } from './api.services';
import { Router } from '@angular/router';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface AuthResponse {
  id?: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  token?: string;
  [key: string]: any; // Para otras propiedades del usuario
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'auth_token';
  private userKey = 'currentUser';

  constructor(private api: ApiService, private router: Router) {}

  login(email: string, password: string): Observable<AuthResponse> {
    console.log('Intentando login con:', { email, password });
    return this.api.post<AuthResponse>('auth/login', { email, password }).pipe(
      tap(res => {
        console.log('Login exitoso:', res);
        // La respuesta ES el usuario + token (no está anidado en res.user)
        if (res && res.token) {
          localStorage.setItem(this.tokenKey, res.token);
        }
        if (res) {
          localStorage.setItem(this.userKey, JSON.stringify(res));
        }
      })
    );
  }

  register(payload: any): Observable<any> {
    console.log('Intentando registro con:', payload);
    return this.api.post<any>('auth/register', payload);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getCurrentUser(): any | null {
    const v = localStorage.getItem(this.userKey);
    return v ? JSON.parse(v) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user && user.id === 1;
  }
}