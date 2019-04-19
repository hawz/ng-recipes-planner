/**
 *
 *                      RECIPES SERVICE
 *
 * The RecipesService is responsible for fetching the list of recipes
 * or a single recipe (given the id) and for saving / removing recipes
 * for the authenticated user to / from the firestore DB.
 *
 */

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

  /**
   * @param httpClient performs the HTTP requests
   * @param uiService service to manage the loading spinner and the snackBar message service
   * @param userService custom user management service
   * @param db firestore service to communicate with DB
   */
  constructor(
    private httpClient: HttpClient,
    private uiService: UIService,
    private userService: UserService,
    private db: AngularFirestore
  ) { }

  /**
   * The fetchRecipes performs a GET API call to the URL specified by
   * this.serviceAPIUrl (which equals env.bigOven.apiURL), fetching the recipes resource
   * it has some optional parameters:
   *
   * @param searchText Recipe name to search
   * @param page Page number
   * @param resultsPerPage Number of results per page to display
   */
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

  /**
   * The fetchRecipe method takes a single recipeId (passed as a parameter)
   * and performs a GET API call to the serviceAPIUrl.
   * The API response is then mapped into a Recipe object and returned.
   *
   * @param recipeId Single recipe identificator
   */
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

  /**
   * The addRecipe method takes a given recipe (passed as a parameter) and
   * adds the userId to it, then saves it to the Firestore DB calling the private
   * saveDataToDB() method.
   *
   * @param recipe Recipe to be saved on the DB.
   */
  addRecipe(recipe: Recipe) {
    const userId = this.userService.getUser().uid;
    this.saveDataToDB({
      ...recipe,
      userId
    });
  }

  /**
   * The removeRecipe method is responsible for deleting a specific recipe of a specific
   * day of the week from the DB. It takes the recipe as a parameter, together with the meal
   * and the seconds (from the saved recipe timestamp) in order to filter the exact recipe
   * document from the DB and then remove it.
   *
   * @param recipe Recipe to be removed
   * @param meal Meal of the day to remove the recipe from
   * @param seconds Timestamp to locate the exact recipe during the week
   */
  removeRecipe(recipe: Recipe, meal: string, seconds: number) {
    this.uiService.loadingStateChanged.next(true);
    const recipeDate = new Date(seconds * 1000);
    this.db
      .collection('savedRecipes', ref =>
        ref
          .where('userId', '==', this.userService.getUser().uid)
          .where('recipeId', '==', recipe.recipeId)
          .where('meal', '==', meal)
          .where('date', '==', recipeDate)
      )
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as Recipe;
            const id = a.payload.doc.id;
            return { id, ...data};
          });
        })
      )
      .subscribe(
        (recipes: any[]) => {
          this.db.doc(`savedRecipes/${recipes[0].id}`)
            .delete()
            .then(() => {
              this.uiService.loadingStateChanged.next(false);
              this.uiService.openSnackBar('Recipe successfully removed.', null, 3000);
            })
            .catch(err => {
              this.uiService.loadingStateChanged.next(false);
              this.uiService.openSnackBar('Recipe deletion failed, please try again later.', null, 3000);
            });
        }
      );

  }

  /**
   * The getWeekMenu method fetches all the saved recipes for the authenticated user
   * in the date interval starting today and ending the next week (so 7 days from today).
   */
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
            this.uiService.openSnackBar('Error fetching recipes from database. Please try again later.', null, 3000);
            this.menuChanged.next([]);
          }
        )
    );
  }

  /**
   * The cancelSubscriptions method removes each subscription contained
   * in the firebaseSubscriptions array, calling unsubscribe for each one
   * of them.
   */
  cancelSubscriptions() {
    this.firebaseSubscriptions.forEach(sub => sub.unsubscribe());
  }

  /**
   * The setRecipes method sets the recipes property equal to an array of
   * recipes, mapping the result of the GET /recipes API call which returns
   * an array of "complex" recipe objects.
   * The method then updates the components listening on the recipesChanged
   * subject emitting the new array.
   *
   * @param response result of the fetchRecipes API call to be processed
   */
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

  /**
   * The saveDataToDB method takes a single recipe as a parameter
   * and adds it to the 'savedRecipes' collection on the Firestore
   * Cloud DB. It updates the loading state of the spinner accordingly
   * and shows a confirm / error message with a snackBar using the
   * UIService.
   *
   * @param recipe Recipe to be saved to the Firestore DB
   */
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
