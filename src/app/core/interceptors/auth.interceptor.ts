import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Obtener el token del localStorage
    const token = this.authService.getToken();
    console.log('=== AuthInterceptor ===');
    console.log('URL:', request.url);
    console.log('Token disponible:', !!token);
    
    if (token) {
      console.log('Token encontrado, agregando al request...');
      console.log('Token primeros 50 caracteres:', token.substring(0, 50) + '...');
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Header Authorization establecido:', request.headers.get('Authorization'));
    } else {
      console.warn('❌ No hay token disponible en el interceptor');
      console.warn('LocalStorage auth_token:', localStorage.getItem('auth_token'));
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('❌ Error en request:', error.status, error.statusText);
        // Si el error es 401 (No autorizado), limpiar el token y redirigir a login
        if (error.status === 401) {
          console.warn('Token expirado o no válido. Redirigiendo a login...');
          this.authService.logout();
          this.router.navigate(['/login']);
        }
        
        return throwError(() => error);
      })
    );
  }
}
