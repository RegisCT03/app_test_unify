import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
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
            return true;
    }
    // Si no cumple las condiciones, crea un UrlTree para redirigir a /login.
    // Esta es la forma recomendada de manejar redirecciones en guardas.
    console.warn('Acceso denegado: Se requiere rol de administrador.');
    return this.router.createUrlTree(['/login']);
  }
}
