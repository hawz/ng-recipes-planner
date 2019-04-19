/**
 *
 *                      RECIPES MODULE
 *
 * The RecipesModule is a separate external module which is responsible for
 * handling the recipes, that means:
 *
 * - displaying the recipes list
 * - displaying the recipes plan (calendar) for the next week
 * - displaying a single recipe details:
 *   - before adding it to the calendar
 *   - before removing it from the calendar
 * - adding a recipe to the calendar
 * - removing a recipe from the calendar
 */

import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipesCalendarComponent } from './recipes-calendar/recipes-calendar.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { ShortenPipe } from '../shared/shorten.pipe';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeAddComponent } from './recipe-add/recipe-add.component';
import { RecipeRemoveComponent } from './recipe-remove/recipe-remove.component';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipesCalendarComponent,
    RecipesListComponent,
    ShortenPipe,
    RecipeDetailsComponent,
    RecipeAddComponent,
    RecipeRemoveComponent
  ],
  imports: [
    SharedModule,
    RecipesRoutingModule
  ],
  exports: [],
  providers: [],
  entryComponents: [
    RecipeAddComponent,
    RecipeRemoveComponent
  ]
})
export class RecipesModule { }
