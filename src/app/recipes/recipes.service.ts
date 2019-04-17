import { Injectable } from '@angular/core';
import { Subject, Observable, of, Subscription } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Recipe } from './recipe.model';
import { UIService } from '../shared/ui.service';
import { UserService } from '../shared/user.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  readonly serviceAPIUrl = environment.bigOven.apiURL;
  readonly serviceAPIKey = environment.bigOven.apiKey;
  recipes: Recipe[] = [];
  recipesChanged = new Subject<Recipe[]>();
  menuChanged = new Subject<Recipe[]>();
  resultsNumberChanged = new Subject<number>();
  private firebaseSubscriptions: Subscription[] = [];

  constructor(
    private httpClient: HttpClient,
    private uiService: UIService,
    private userService: UserService,
    private db: AngularFirestore
  ) { }

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

  addRecipe(recipe: Recipe) {
    const userId = this.userService.getUser().uid;
    this.saveDataToDB({
      ...recipe,
      userId
    });
  }

  getWeekMenu() {

    const startDay = new Date();
    const endDay = new Date();
    startDay.setDate(startDay.getDate() + 0);
    startDay.setHours(0);
    startDay.setMinutes(0);
    startDay.setSeconds(0);
    startDay.setMilliseconds(0);
    endDay.setDate(endDay.getDate() + 7);
    endDay.setHours(0);
    endDay.setMinutes(0);
    endDay.setSeconds(0);
    endDay.setMilliseconds(0);

    console.log(startDay, endDay);

    this.firebaseSubscriptions.push(
      this.db
        .collection('savedRecipes', ref =>
          ref
            .where('userId', '==', this.userService.getUser().uid)
            .where('date', '>=', startDay)
            .where('date', '<', endDay)
        )
        .valueChanges()
        .subscribe(
          (recipes: Recipe[]) => {
            this.menuChanged.next(recipes);
          },
          (err) => {
            // console.log(err);
            this.uiService.openSnackBar('Error fetching recipes from database. Please try again later.', null, 3000);
            this.menuChanged.next([]);
          }
        )
    );
  }

  cancelSubscriptions() {
    this.firebaseSubscriptions.forEach(sub => sub.unsubscribe());
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

  private saveDataToDB(recipe: Recipe) {
    this.uiService.loadingStateChanged.next(true);
    this.db.collection('savedRecipes')
      .add(recipe)
      .then(() => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.openSnackBar('Recipe saved!', null, 3000);
      })
      .catch(err => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.openSnackBar(err.message, null, 3000);
      });
  }
}
