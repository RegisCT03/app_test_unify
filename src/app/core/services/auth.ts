import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model'; // Importamos nuestro modelo

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private router: Router) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }


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
      this.router.navigate(['/admin']); // Redirige al panel de administrador
      return true;
    }
    
    if (email === 'user@test.com' && password === 'user12345') {
      const regularUser: User = {
        id: '2',
        name: 'Usuario Normal',
        email: 'user@test.com',
        role: 'user'
      };

      localStorage.setItem('currentUser', JSON.stringify(regularUser));
      this.currentUserSubject.next(regularUser);
      this.router.navigate(['/booking']); // Redirige a la página de reservas
      return true;
    }

    return false;
  }


  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']); // Opcional: redirigir al login al cerrar sesión
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
