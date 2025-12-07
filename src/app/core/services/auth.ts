import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model'; // Importamos nuestro modelo

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // BehaviorSubject para mantener el estado del usuario actual.
  // Inicia como null (nadie ha iniciado sesión).
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor() {
    // Al iniciar el servicio, intentamos recuperar al usuario desde localStorage.
    // Esto permite mantener la sesión activa si el usuario recarga la página.
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  /**
   * Devuelve el valor actual del usuario (sincrónico).
   */
  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * @param email 
   * @param password 
   */
  login(email: string, password: string): boolean {

    if (email === 'admin@test.com' && password === 'admin123') {
      const adminUser: User = {
        id: '1',
        name: 'Administrador',
        email: 'admin@test.com',
        role: 'admin',
      };
      
      localStorage.setItem('currentUser', JSON.stringify(adminUser));
      this.currentUserSubject.next(adminUser);
      return true;
    }
    
    if (email === 'user@test.com' && password === 'user') {
      const regularUser: User = {
        id: '2',
        name: 'Usuario Normal',
        email: 'user@test.com',
        role: 'user'
      };

      localStorage.setItem('currentUser', JSON.stringify(regularUser));
      this.currentUserSubject.next(regularUser);
      return true;
    }

    return false;
  }


  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  /**
   * @param requiredRole 
   */
  hasRole(requiredRole: string): boolean {
    if (!this.currentUserValue) {
      return false;
    }
    return this.currentUserValue.role === requiredRole;
  }

  isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }
}
