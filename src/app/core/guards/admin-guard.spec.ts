import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AdminGuard } from './admin-guard';
import { AuthService } from '../services/auth';

describe('AdminGuard', () => {
  let guard: AdminGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router; 

  const dummyRoute = {} as ActivatedRouteSnapshot;
  const dummyState = {} as RouterStateSnapshot;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn', 'hasRole']);

    TestBed.configureTestingModule({
      providers: [
        AdminGuard,
        { provide: AuthService, useValue: authServiceSpy }
      ]
    });

    guard = TestBed.inject(AdminGuard);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation for a logged-in admin user', () => {
    authService.isLoggedIn.and.returnValue(true);
    authService.hasRole.withArgs('admin').and.returnValue(true);

    const canActivate = guard.canActivate(dummyRoute, dummyState);
    expect(canActivate).toBe(true);
  });

  it('should deny activation and return a UrlTree to /login if user is not an admin', () => {
    authService.isLoggedIn.and.returnValue(true);
    authService.hasRole.withArgs('admin').and.returnValue(false);

    const result = guard.canActivate(dummyRoute, dummyState) as UrlTree;
    expect(result instanceof UrlTree).toBe(true);
    expect(router.serializeUrl(result)).toBe('/login');
  });
});
