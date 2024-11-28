import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.authService.isLoggedIn()) {
      alert('You must log in to access this page.');
      this.router.navigate(['/login']);
      return false;
    }
    const requiredRole = route.data['role'];
    const userRole = this.authService.getUserRole();
    if (requiredRole && userRole !== requiredRole) {
      alert('Access Denied: Insufficient Permissions');
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
