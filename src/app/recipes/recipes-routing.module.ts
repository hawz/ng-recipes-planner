/**
 *
 *                      RECIPES-ROUTING MODULE
 *
 * The RecipesRoutingModule defines the three lazy loaded routes handled inside the RecipesModule.
 *
 * For the single recipe routes (both handled by the RecipeDetails component) it gets
 * the resolved recipe (from the GET /recipes/:id API call) from the RecipeResolver
 * service.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeResolver } from './recipe-resolver.service';

/**
 * The routes here defined are:
 * - recipes --> handled by the RecipesComponent
 * - recipes/:id --> handled by the RecipeDetailsComponent
 * - recipes/:id/edit --> handled by the RecipeDetailsComponent as well
 */
const routes: Routes = [
  { path: '', component: RecipesComponent },
  { path: ':id', component: RecipeDetailsComponent, resolve: { recipe: RecipeResolver } },
  { path: ':id/edit', component: RecipeDetailsComponent, resolve: { recipe: RecipeResolver } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
