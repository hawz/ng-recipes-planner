import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { RecipesService } from '../recipes.service';
import { Recipe } from '../recipe.model';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';
import { MatPaginator, MatSort } from '@angular/material';
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
  displayedColumns: string[] = ['name', 'category', 'subcategory'];
  isLoading = true;
  resultsLength = 0;

  @ViewChild('searchForm') searchForm: NgForm;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private recipesService: RecipesService, private uiService: UIService) { }

  ngOnInit() {
    this.registerForLoadingChanges();
    this.registerForRecipesChanges();
    this.registerForResultsCount();
    // this.fetchRecipes();
    this.initSearch();
  }

  registerForLoadingChanges() {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }

  registerForRecipesChanges() {
    this.recipesChangedSubs = this.recipesService.recipesChanged.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
  }

  registerForResultsCount() {
    this.resultsNumberSubs = this.recipesService.resultsNumberChanged.subscribe(resultsNumber => {
      this.resultsLength = resultsNumber;
    });
  }

  fetchRecipes(searchText: string = null, page: number = 1) {
    searchText = this.searchForm.value.searchText === '' ? null : this.searchForm.value.searchText;
    this.recipesSubs = this.recipesService.fetchRecipes(searchText, page).subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
  }

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

  ngAfterViewInit() {
    // when changing page we perform a new api call
    this.paginator.page.subscribe(() => {
      this.fetchRecipes(null, this.paginator.pageIndex + 1);
    });
  }

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
