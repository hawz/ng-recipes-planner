import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipesService } from '../recipes.service';
import { Recipe } from '../recipe.model';
import { MatDialog } from '@angular/material';
import { RecipeAddComponent } from '../recipe-add/recipe-add.component';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';

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
  loadingSubs: Subscription;

  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipesService,
    public dialog: MatDialog,
    private uiService: UIService
  ) { }

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.fetchRecipe();
      }
    );

    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(
      isLoading => this.isLoading = isLoading
    );
  }

  fetchRecipe() {
    this.recipesService.fetchRecipe(this.id)
      .subscribe((recipe: Recipe) => {
        this.recipe = recipe;
      });
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

  ngOnDestroy() {
    if (this.loadingSubs) {
      this.loadingSubs.unsubscribe();
    }
  }

}
