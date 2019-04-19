/**
 *
 *                        RECIPES-LIST COMPONENT
 *
 * The RecipesListComponent is the one responsible for searching and displaying a paginated
 * list of recipes.
 */
import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { RecipesService } from '../recipes.service';
import { Recipe } from '../recipe.model';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';
import { MatPaginator } from '@angular/material';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, AfterViewInit, OnDestroy {
  recipes: Recipe[];
  loadingSubs: Subscription;
  recipesChangedSubs: Subscription;
  recipesSubs: Subscription;
  resultsNumberSubs: Subscription;

  searchText: string;
  displayedColumns: string[] = ['name', 'category', 'subcategory']; // fields to display in the recipes table
  isLoading = true;
  resultsLength = 0;

  /**
   *
   * Here we declare two viewchild properties in order to subscribe for changes
   * in their values.
   */
  @ViewChild('searchForm') searchForm: NgForm;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * @param recipesService Recipes service used for fetching recipes
   * @param uiService Service used to handle the loading spinner
   */
  constructor(private recipesService: RecipesService, private uiService: UIService) { }

  /**
   * When initializing the component, a number of subjects are subscribed, in order to
   * receive updates for the loading state, the recipes list, and the number of results.
   *
   * Also, the input search changes are listened in order to make an API call after entering
   * the name of a recipe (some debounce and distinct checks are applied).
   *
   */
  ngOnInit() {
    this.registerForLoadingChanges();
    this.registerForRecipesChanges();
    this.registerForResultsCount();
    this.initSearch();
  }

  /**
   * The method subscribes to the uiService.loadingStateChanged subject in order to show / hide
   * the loading spinner.
   */
  registerForLoadingChanges() {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(
      (isLoading: boolean) => {
        this.isLoading = isLoading;
      }
    );
  }

  /**
   * The method subscribes to the recipesService.recipesChanged subject in order to receive
   * updates about the recipes list and update the recipes property accordingly.
   */
  registerForRecipesChanges() {
    this.recipesChangedSubs = this.recipesService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
  }

  /**
   * The method subscribes to the recipesService.resultsNumberChanged subject in order to receive
   * updates about the number of results and update the resultsLength property accordingly.
   */
  registerForResultsCount() {
    this.resultsNumberSubs = this.recipesService.resultsNumberChanged.subscribe(
      (resultsNumber: number) => {
        this.resultsLength = resultsNumber;
      }
    );
  }

  /**
   * The method calls the fetchRecipes method from the recipesService in order to search for a list
   * of recipes. It then subscribes to the observable returned by the method and updates the recipes
   * array with the result.
   */
  fetchRecipes(searchText: string = null, page: number = 1) {
    searchText = this.searchForm.value.searchText === '' ? null : this.searchForm.value.searchText;
    this.recipesSubs = this.recipesService.fetchRecipes(searchText, page).subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
  }

  /**
   * This method listens for changes in the searchForm (which is a ViewChild property)
   * in order to get the inserted valye and call the fetchRecipes method with a debounce time
   * and only if the inserted value has not changed.
   */
  initSearch() {
    this.searchForm.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(data => {
        this.fetchRecipes(data.searchText);
      });
  }

  /**
   * The ngAfterViewInit lifecycle hook here is used to handle the paginator page change
   * after the view has been initialized, in order to make a new API call with the new page number
   * and search for recipes in the previous / next page.
   */
  ngAfterViewInit() {
    this.paginator.page.subscribe(() => {
      this.fetchRecipes(null, this.paginator.pageIndex + 1);
    });
  }

  /**
   * When detroying the component, all the subscriptions are removed for performance reasons.
   */
  ngOnDestroy() {
    if (this.loadingSubs) {
      this.loadingSubs.unsubscribe();
    }
    if (this.recipesChangedSubs) {
      this.recipesChangedSubs.unsubscribe();
    }
    if (this.recipesSubs) {
      this.recipesSubs.unsubscribe();
    }
    if (this.resultsNumberSubs) {
      this.resultsNumberSubs.unsubscribe();
    }
  }
}
