import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environments';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  get<T>(path: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(this.base + path, { params }).pipe(catchError(this.handleError));
  }

  post<T>(path: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.post<T>(this.base + path, body, { headers }).pipe(catchError(this.handleError));
  }

  put<T>(path: string, body: any): Observable<T> {
    return this.http.put<T>(this.base + path, body).pipe(catchError(this.handleError));
  }

  delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(this.base + path).pipe(catchError(this.handleError));
  }

  private handleError(err: any) {
    // Puedes mapear errores aquí
    return throwError(() => err);
  }
}