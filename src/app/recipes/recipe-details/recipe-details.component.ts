import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Data } from '@angular/router';
import { RecipesService } from '../recipes.service';
import { Recipe } from '../recipe.model';
import { MatDialog } from '@angular/material';
import { RecipeAddComponent } from '../recipe-add/recipe-add.component';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';
import { RecipeRemoveComponent } from '../recipe-remove/recipe-remove.component';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit, OnDestroy {
  id: number;
  recipe: Recipe = {
    name: '',
    category: '',
    subcategory: '',
    recipeId: this.id,
    imageURL: '',
    imageSmallURL: ''
  };
  isLoading = false;
  isEdit = false;
  loadingSubs: Subscription;

  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipesService,
    public dialog: MatDialog,
    private uiService: UIService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        this.recipe = data['recipe'];
      }
    );

    this.route.queryParams.subscribe(
      (queryParams: Params) => {
        this.isEdit = queryParams['edit'] === '1' ? true : false;
      }
    );

    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(
      isLoading => this.isLoading = isLoading
    );
  }

  onAddRecipeToMenu() {
    const dialogRef = this.dialog.open(RecipeAddComponent, {
      data: {
        recipe: this.recipe
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.recipesService.addRecipe(result);
      }
    });
  }

  onRemoveRecipeFromMenu() {
    const dialogRef = this.dialog.open(RecipeRemoveComponent, {
      data: {
        recipe: this.recipe
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.isEdit && result) {
        const meal = this.route.snapshot.queryParams['meal'];
        const seconds = +this.route.snapshot.queryParams['seconds'];
        this.recipesService.removeRecipe(this.recipe, meal, seconds);
      }
    });
  }

  ngOnDestroy() {
    if (this.loadingSubs) {
      this.loadingSubs.unsubscribe();
    }
  }

}
