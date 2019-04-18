/**
 *
 *                          APP COMPONENT
 *
 * The App Component is fairly simple, it's only a wrapper for
 * the <router-outlet> and it includes a material sidebar and a header component.
 *
 * It's worth noticing that inside the ngOnInit lifecycle hook of the AppComponent,
 * the initAuthListener method is called from the authService, in order to
 * subscribe for changes of the authenticated user from the firebase authentication.
 *
 */

import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.initAuthListener();
  }
}
