import { Injectable } from '@angular/core';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: User;

  constructor() { }

  setUser(user: User) {
    this.user = user;
  }

  getUser() {
    if (this.user) {
      return this.user;
    }
  }
}
