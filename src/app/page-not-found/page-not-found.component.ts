/**
 *
 *          PAGE-NOT-FOUND COMPONENT
 *
 * The PageNotFoundComponent is basically responsible for displaying the
 * page-not-found template when a page is not found.
 *
 * Every route not declared in the app-routing.module, the auth-routing.module
 * or the recipes-routing.module leads here.
 *
 */

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent {}
