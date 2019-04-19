/**
 *
 *            LOGIN COMPONENT
 *
 * The LoginComponent is responsible for handling the login form, taking user credentials (email and password)
 * and calling the authService.login() method passing those exact credentials.
 *
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { UIService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  private loadingSubscription: Subscription;

  /**
   *
   * @param uiService UIService injected in order to manage the loading spinner
   * @param authService AuthService injected in order to call the login method and authenticate the user
   */
  constructor(private uiService: UIService, private authService: AuthService) { }

  /**
   * When the Login component is initialized, we subscribe to the loadingStateChanged subject provided
   * by the uiService in order to receive updates about the loading state of the spinner (so every time
   * an API call is performed, this behavior is handled by the specific service method called).
   */
  ngOnInit() {
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
      isLoading => { this.isLoading = isLoading; }
    );
  }

  /**
   * @param loginForm the Form instance passed as a parameter when submitting the login form
   */
  onSubmit(loginForm: NgForm) {
    this.authService.login(loginForm.value);
  }

  /**
   * When destroying the component instance, the loadin subscription is removed calling the unsubscribe method,
   * thus positively affecting performance.
   */
  ngOnDestroy() {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }

}
