/**
 *
 *            SIGNUP COMPONENT
 *
 * The SignupComponent is responsible for handling the signup form, taking user credentials (email and password)
 * and calling the authService.registerUser() method passing those exact credentials.
 *
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate;
  isLoading = false;
  private loadingSubscription: Subscription;

  /**
   * @param uiService UIService injected in order to manage the loading spinner
   * @param authService AuthService injected in order to call the registerUser method and create a user
   */
  constructor(private uiService: UIService, private authService: AuthService) { }

  /**
   * When the Signup component is initialized, we subscribe to the loadingStateChanged subject provided
   * by the uiService in order to receive updates about the loading state of the spinner (so every time
   * an API call is performed, this behavior is handled by the specific service method called).
   * Also, the maxDate property is initialized, it will be used by the datePicker inside the signup form.
   */
  ngOnInit() {
    this.maxDate = new Date();
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
      isLoading => { this.isLoading = isLoading; }
    );
  }

  /**
   * @param signupForm the Form instance passed as a parameter when submitting the signup form.
   * We take just the email and password values in order to have an authData object, which the
   * registerUser method takes as a parameter.
   */
  onSubmit(signupForm: NgForm) {
    this.authService.registerUser({
      email: signupForm.value.email,
      password: signupForm.value.password
    });
  }

  /**
   * When destroying the component instance, the loading subscription is removed calling the unsubscribe method,
   * thus positively affecting performance.
   */
  ngOnDestroy() {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }

}
