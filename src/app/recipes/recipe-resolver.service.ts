/**
 *                  RECIPE RESOLVER
 *
 * The RecipeResolver class acts as a data provider
 * implementing the Resolve interface and providing
 * a Recipe whenever a single recipe route is fetched:
 *
 * - /recipes/:id --> Recipe details
 * - /recipes/:id --> Recipe edit (just to remove a recipe from the calendar)
 */

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { Observable } from 'rxjs';
import { RecipesService } from './recipes.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolver implements Resolve<Recipe> {
  /**
   * @param recipesService the recipes Service in order to call the fetchRecipe method passing a specific recipeId
   */
  constructor(private recipesService: RecipesService) { }

  /**
   * @param route the activated route snapshot, used to fetch the id of the desired recipe.
   */
  resolve(route: ActivatedRouteSnapshot): Observable<Recipe> | Promise<Recipe> | Recipe {
    return this.recipesService.fetchRecipe(+route.params['id']);
  }
}
