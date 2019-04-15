import { Injectable } from '@angular/core';

import { AuthData } from './auth-data.model';
import { UIService } from '../shared/ui.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private uiService: UIService,
    private afAuth: AngularFireAuth
  ) { }

  registerUser(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(
        result => {
          console.log(result);
          this.uiService.loadingStateChanged.next(false);
        }
      )
      .catch(
        error => {
          console.log(error);
          this.uiService.loadingStateChanged.next(false);
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
      });
  }
}
