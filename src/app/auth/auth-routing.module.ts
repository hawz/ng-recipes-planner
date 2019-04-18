/**
 *
 *                        AUTH-ROUTING MODULE
 *
 * The AuthRoutingModule defines the two routes handled inside the AuthModule.
 *
 * The routes here defined are:
 * - signup --> handled by the SignupComponent
 * - login --> handled by the LoginComponent
 *
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
