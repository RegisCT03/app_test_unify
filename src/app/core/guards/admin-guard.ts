import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {

    if (this.authService.isLoggedIn() && this.authService.hasRole('admin')) {
      // Si el usuario está logueado y es administrador, permite el acceso.
      return true;
    }

    // Si no cumple las condiciones, redirige a la página de login.
    console.warn('Acceso denegado: Se requiere rol de administrador.');
    this.router.navigate(['/login']); // O a una página de 'acceso-denegado'
    return false;
  }
}
