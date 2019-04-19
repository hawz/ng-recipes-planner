/**
 *
 *        AUTH SERVICE
 *
 * The Auth Service is responsible for the Authentication process with the Firebase
 * service. It's a class provided across the entire application, since some of its
 * methods are called from components (such as the Header and Sidenav components)
 * which live outside the Auth Module.
 *
 */

import { Injectable } from '@angular/core';

import { AuthData } from './auth-data.model';
import { UIService } from '../shared/ui.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { RecipesService } from '../recipes/recipes.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;
  authChange = new Subject<boolean>();

  /**
   *
   * @param uiService shared service to handle some UI features like spinner and snackBox
   * @param afAuth angular wrapper for the firebase authentication service
   * @param router module for navigation
   * @param userService service to set and get the authenticated user
   * @param recipesService service to handle recipes (fetch from API, save to firestore DB)
   */
  constructor(
    private uiService: UIService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private userService: UserService,
    private recipesService: RecipesService
  ) { }

  /**
   *
   * The registerUser method creates a new user, it's called from the signup component
   * and it invokes the specific createUserWithEmailAndPassword method from firebase.
   *
   * It handles the UI loading spinner calling next on the loadingStateChanged subject,
   * then makes the API call and shows a confirm / error message accordingly.
   *
   * The authentication is then handled by the subscription made in the initAuthListener
   * method.
   *
   * @param authData the authData model, contains email and password fields
   */
  registerUser(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(
        () => {
          this.uiService.loadingStateChanged.next(false);
          this.uiService.openSnackBar('User registered succesfully!', null, 3000);
        }
      )
      .catch(
        error => {
          this.uiService.loadingStateChanged.next(false);
          this.uiService.openSnackBar(error.message, null, 3000);
        }
      );
  }

  /**
   *
   * The login method authenticates the user, it's called from the login component
   * and it invokes the specific signInWithEmailAndPassword method from firebase.
   *
   * It handles the UI loading spinner calling next on the loadingStateChanged subject,
   * then makes the API call and shows a confirm / error message accordingly.
   *
   * The authentication is then handled by the subscription made in the initAuthListener
   * method.
   *
   * @param authData the authData model, contains email and password fields
   */
  login(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log(result);
        this.uiService.loadingStateChanged.next(false);
      })
      .catch(error => {
        console.log(error);
        this.uiService.loadingStateChanged.next(false);
        this.uiService.openSnackBar(error.message, null, 3000);
      });
  }

  /**
   * The initAuthListener method is called from the appComponent (so when the entire app is initialized)
   * to subscribe for user authentication changes from the authState observable provided by the firebase
   * authentication service. Basically the user can be defined or undefined, depending on the authentication
   * state, so when a defined object is returned for the user (meaning we are authenticated), the user is
   * set inside the userService, the isAuthenticated flag is set to true and the next method is called on
   * the authChange subject, in order to communicate to the listening subscriptions that we're logged in.
   * The router navigates to the recipes route which is accessible only by authenticated users.
   *
   * On the other hand, when something changes on the user object and it becomes undefined (so, when a user
   * signs out) we call the recipesService.cancelSubscriptions method to unsubscribe from all the recipes
   * subscriptions, then we set the isAuthenticated flag to false and communicate to the listening subscriptions
   * that now we've signed out. The router then navigates to the main route.
   */
  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        // user is authenticated
        this.userService.setUser(user);
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/recipes']);
      } else {
        // NO user authenticated
        this.recipesService.cancelSubscriptions();
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.router.navigate(['/']);
      }
    });
  }

  /**
   *  Logout
   *
   * This method calls signOut() on the auth object of the firebase service.
   *
   * User authentication (signout in this case) is then handled by the subscription made in
   * the initAuthListener method.
   */
  logout() {
    this.afAuth.auth.signOut();
  }

  /**
   * The isAuth method is called from the AuthGuard service in order to detect
   * whether a user is authenticated or not. It returns the value of the isAuthenticated
   * flag.
   */
  isAuth() {
    return this.isAuthenticated;
  }
}
