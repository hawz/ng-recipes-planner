/**
 *
 *                           APP MODULE
 *
 * This is a the main application module where the basic modules are
 * imported and the main components are declared.
 *
 * The main routing module is imported here, as well as non-lazy-loaded
 * modules, which will include their own routing (e.g. the AuthModule).
 * Lazy loaded routes are declared, but their module is obviously not imported,
 * (it will be only when the route is visited).
 *
 * The Firebase application is also initialized here, fetching credentials from the
 * environment which is also imported here. So the AngularFireModule is responsible
 * of communicating with the firebase app when it comes to authentication.
 *
 * The Firestore module is responsible of dealing with Firestore DB (e.g. in order to
 * save and fetch the favorite recipes during the week ahead).
 *
 * Inside the AppComponent, the Header and SidenavList Components are declared, together
 * with the WelcomeComponent, which is the landing view for non authenticated users.
 *
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';

import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { HeaderComponent } from './navigation/header/header.component';
import { AuthModule } from './auth/auth.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    SidenavListComponent,
    HeaderComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AuthModule,
    AppRoutingModule,
    AngularFirestoreModule
  ],
  providers: [{ provide: FirestoreSettingsToken, useValue: {} }],
  bootstrap: [AppComponent]
})
export class AppModule { }
