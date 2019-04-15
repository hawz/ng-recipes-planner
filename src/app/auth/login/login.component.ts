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

  constructor(private uiService: UIService, private authService: AuthService) { }

  ngOnInit() {
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
      isLoading => { this.isLoading = isLoading; }
    );
  }

  onSubmit(loginForm: NgForm) {
    console.log('submit', loginForm);
    this.authService.login(loginForm.value);
  }

  ngOnDestroy() {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }

}
