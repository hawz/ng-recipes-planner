/**
 *
 *                                AUTH MODULE
 *
 * The AuthModule is a separate external module which is responsible for
 * the authentication and communication with Firebase. Basically it consists in
 * - AuthRouting Module
 * - Login Component
 * - Signup Component
 * - Authentication Service
 * - Authentication Guard
 *
 * The module imports the SharedModule which contains a few common modules
 * shared by the AuthModule with the RecipesModule.
 */

import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AuthRoutingModule } from './auth-routing.module';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent
  ],
  imports: [
    SharedModule,
    AngularFireAuthModule,
    AuthRoutingModule
  ],
  exports: []
})
export class AuthModule { }
