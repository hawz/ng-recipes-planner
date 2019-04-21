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

  /**
   * @param authService the Authentication Service is injected in order to call the isAuth method
   * @param router the router is injected in order to redirect users if they're not authenticated
   */
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  /**
   * the canActivate interface is implemented here in order to return true only if the authService.isAuth()
   * method returns true. Otherwise it redirects users to the login route.
   */
  canActivate() {
    if (this.authService.isAuth()) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }

  /**
   * the canLoad interface is implemented here in order to return true only if the authService.isAuth()
   * method returns true. Otherwise it redirects users to the login route.
   */
  canLoad(route: Route) {
    if (this.authService.isAuth()) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }
}
