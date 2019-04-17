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

  constructor(
    private uiService: UIService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private userService: UserService,
    private recipesService: RecipesService
  ) { }

  registerUser(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(
        result => {
          this.uiService.loadingStateChanged.next(false);
          this.uiService.openSnackBar('User registered succesfully!', null, 3000);
        }
      )
      .catch(
        error => {
          console.log(error);
          this.uiService.loadingStateChanged.next(false);
          this.uiService.openSnackBar(error.message, null, 3000);
        }
      );
  }

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

  logout() {
    this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
