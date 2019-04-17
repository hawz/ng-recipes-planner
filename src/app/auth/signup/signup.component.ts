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

  constructor(private uiService: UIService, private authService: AuthService) { }

  ngOnInit() {
    this.maxDate = new Date();
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
      isLoading => { this.isLoading = isLoading; }
    );
  }

  onSubmit(signupForm: NgForm) {
    this.authService.registerUser({
      email: signupForm.value.email,
      password: signupForm.value.password
    });
  }

  ngOnDestroy() {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }

}
