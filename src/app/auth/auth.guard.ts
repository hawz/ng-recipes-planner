/**
 *
 *                        AUTH-GUARD
 *
 * The AuthGuard is basically a class that implements the CanLoad and CanActivate interfaces.
 * In this case, the two methods are pretty similar to each other, as they let the user access
 * the protected route if the authService.isAuth() call returns true, otherwise they redirect
 * the user to the login route.
 *
 */

import { Injectable } from '@angular/core';
import { CanLoad, CanActivate, Router, Route } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    if (this.authService.isAuth()) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }

  canLoad(route: Route) {
    if (this.authService.isAuth()) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }
}
