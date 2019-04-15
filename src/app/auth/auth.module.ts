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
