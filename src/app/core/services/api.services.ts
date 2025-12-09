import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environments';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(extra?: HttpHeaders): HttpHeaders {
    const token = localStorage.getItem('auth_token') || localStorage.getItem('token');
    let headers = extra ? extra : new HttpHeaders();
    if (token) {
      if (!headers.has('Authorization')) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }
    return headers;
  }

  get<T>(path: string, params?: HttpParams): Observable<T> {
    const headers = this.getAuthHeaders();
    return this.http.get<T>(this.base + path, { params, headers }).pipe(catchError(this.handleError));
  }

  post<T>(path: string, body: any, headers?: HttpHeaders): Observable<T> {
    const h = this.getAuthHeaders(headers);
    return this.http.post<T>(this.base + path, body, { headers: h }).pipe(catchError(this.handleError));
  }

  put<T>(path: string, body: any): Observable<T> {
    const headers = this.getAuthHeaders();
    return this.http.put<T>(this.base + path, body, { headers }).pipe(catchError(this.handleError));
  }

  delete<T>(path: string): Observable<T> {
    const headers = this.getAuthHeaders();
    return this.http.delete<T>(this.base + path, { headers }).pipe(catchError(this.handleError));
  }

  private handleError(err: any) {
    // Puedes mapear errores aquí
    return throwError(() => err);
  }
}