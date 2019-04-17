import { Injectable } from '@angular/core';
import { Subject, throwError, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Recipe } from './recipe.model';
import { UIService } from '../shared/ui.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  readonly serviceAPIUrl = environment.bigOven.apiURL;
  readonly serviceAPIKey = environment.bigOven.apiKey;
  recipes: Recipe[] = [];
  recipesChanged = new Subject<Recipe[]>();
  resultsNumberChanged = new Subject<number>();

  constructor(private httpClient: HttpClient, private uiService: UIService) { }

  fetchRecipes(searchText: string = null, page: number = 1, resultsPerPage: number = 10): Observable<Recipe[]> {
    this.uiService.loadingStateChanged.next(true);
    let searchQuery = '';
    if (searchText !== null) {
      searchQuery = `&title_kw=${searchText}`;
    }

    const queryURL = `${this.serviceAPIUrl}/recipes?api_key=${this.serviceAPIKey}${searchQuery}&pg=${page}&rpp=${resultsPerPage}`;

    return this.httpClient.get(queryURL, {
      observe: 'body',
      responseType: 'json'
    }).pipe(
      map((response: any) => {
        this.setRecipes(response);
        this.uiService.loadingStateChanged.next(false);
        this.resultsNumberChanged.next(response.ResultCount);
        return this.recipes;
      }),
      catchError(() => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.openSnackBar('Fetching recipes failed, please try again later.', null, 3000);
        this.resultsNumberChanged.next(0);
        return of(this.recipes);
      })
    );
  }

  fetchRecipe(recipeId: number): Observable<Recipe> {
    this.uiService.loadingStateChanged.next(true);
    const queryURL = `${this.serviceAPIUrl}/recipe/${recipeId}?api_key=${this.serviceAPIKey}`;
    console.log('fetching single recipe: ', queryURL);
    return this.httpClient.get(queryURL)
      .pipe(
        map((response: any) => {
          this.uiService.loadingStateChanged.next(false);
          const recipe: Recipe = {
            recipeId: response.RecipeID,
            name: response.Title,
            category: response.Category,
            subcategory: response.Subcategory,
            description: response.Instructions,
            imageURL: response.ImageURL,
            imageSmallURL: response.ImageURL,
            ingredients: response.Ingredients
          };
          return recipe;
        }),
        catchError((error) => {
          this.uiService.loadingStateChanged.next(false);
          this.uiService.openSnackBar('Fetching the selected recipe failed, please try again later.', null, 3000);
          return of(null);
        })
      );
  }

  saveRecipeToDB(recipe: Recipe) {

  }

  private setRecipes(response) {
    if (response.Results && response.Results.length) {
      this.recipes = response.Results.map(recipe => {
        return {
          name: recipe.Title,
          category: recipe.Category,
          subcategory: recipe.Subcategory,
          recipeId: recipe.RecipeID,
          imageURL: recipe.ImageURL,
          imageSmallURL: recipe.ImageURL120
        };
      });
    }
    this.recipesChanged.next([...this.recipes]);
  }
}
