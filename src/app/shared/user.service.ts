/**
 *
 *    USER SERVICE
 *
 * The UserService is a simple class which is used whenever a user authenticates in order
 * to save the currently active user.
 *
 */

import { Injectable } from '@angular/core';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: User;

  constructor() { }

  /**
   * @param user the user to be saved, it's an instance of the User class provided by firebase.
   */
  setUser(user: User) {
    this.user = user;
  }

  /**
   * This method returns the authenticated user (if present)
   */
  getUser() {
    if (this.user) {
      return this.user;
    }
  }
}
