import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeResolver } from './recipe-resolver.service';

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
