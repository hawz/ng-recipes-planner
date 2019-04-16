import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  readonly serviceAPIUrl = environment.bigOven.apiURL;

  constructor() { }

  fetchRecipes(searchText: string = null, page: number = 1, resultsPerPage: number = 10) {

  }

  fetchRecipe(recipeId: number) {

  }
}
