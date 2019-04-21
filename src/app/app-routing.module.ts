/**
 *
 *                        APP-ROUTING MODULE
 *
 * Here in the AppRoutingModule, the following routes are declared:
 *
 * - / main --> handled by the Welcome component
 *
 * - /recipes --> declared as a lazy loaded route, so no module is imported in the app.module
 * and no component is immediately specified here, instead the path to the module which will
 * be in charge of loading the route is specified. Also, loading this route is protected by
 * an AuthGuard which basically detects whether the user is authenticated or not and lets the
 * user visit the route accordingly.
 *
 * - ** --> all the other unspecified routes are handled by the PageNotFound component.
 *
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: WelcomeComponent },
  {
    path: 'recipes',
    loadChildren: './recipes/recipes.module#RecipesModule',
    canLoad: [AuthGuard]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
