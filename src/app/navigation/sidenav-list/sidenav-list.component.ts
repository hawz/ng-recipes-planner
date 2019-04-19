/**
 *
 *                                 SIDENAV-LIST COMPONENT
 *
 * The SidenavListComponent is responsible for handling the list of links within the mat-sidebar.
 * It will display certain links according to the user authentication state, so it needs to receive
 * updates about it from the authService. In order to do that, the authChange subject is subscribed.
 */

import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  /**
   * The sidenavClose is an Output property of the SidenavListComponent.
   * It's defined as an EventEmitter and used to emit a void event every
   * time we want to close the sidebar. This custom event will be handled
   * in the app.component template, where the sidenav-list component lives,
   * calling the close() method on the #sidenav element.
   */
  @Output() sidenavClose = new EventEmitter<void>();
  isAuthenticated = false;
  authSubscription: Subscription;

  /**
   *
   * @param authService the authentication service is injected in order to provide updates about
   * the user authentication state.
   */
  constructor(private authService: AuthService) { }

  /**
   * The ngOnInit lifecycle hook is used here in order to subscribe to the authService.authChange
   * subject when this component gets initialized. The isAuthenticated flag will be then updated
   * every time a change on this subject is propagated.
   */
  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(
      (isAuthenticated: boolean) => {
        this.isAuthenticated = isAuthenticated;
      }
    );
  }

  /**
   * The onClose method is used to emit an event on the sidenavClose EventEmitter in order to be
   * handled in the app.component template where the #sidenav reference is defined and call the
   * sidenav.close() method there.
   */
  onClose() {
    this.sidenavClose.emit();
  }

  /**
   * the onLogout method closes the sidebar and call the authService.logout() method.
   * The user is then signed off.
   */
  onLogout() {
    this.onClose();
    this.authService.logout();
  }

  /**
   * When destroying the component instance, the authentication subscription is removed calling the unsubscribe method,
   * thus positively affecting performance.
   */
  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
