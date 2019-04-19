/**
 *
 *                   RECIPE-DETAILS COMPONENT
 *
 * The RecipeDetailsComponent is responsible for displaying the recipe
 * details of a given recipe, specified by the recipe id in the URL.
 *
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Data } from '@angular/router';
import { RecipesService } from '../recipes.service';
import { Recipe } from '../recipe.model';
import { MatDialog } from '@angular/material';
import { RecipeAddComponent } from '../recipe-add/recipe-add.component';
import { RecipeRemoveComponent } from '../recipe-remove/recipe-remove.component';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit, OnDestroy {
  id: number;
  // empty recipe
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

  /**
   * @param route Contains info about the active route, such as data or queryParams
   * @param recipesService Recipes service used for adding / removing a recipe
   * @param dialog Service used to open a dialog modal
   * @param uiService Service used to handle the loading spinner
   */
  constructor(
    public route: ActivatedRoute,
    private recipesService: RecipesService,
    public dialog: MatDialog,
    private uiService: UIService
  ) { }

  /**
   * When initializing the component, the route.data observable is subscribed in order to receive
   * the resolved recipe from the recipe resolver service. Also, the route.queryParams observable
   * is subscribed in order to detect if we're just displaying a recipe or removing it.
   * The loadingStateChanged subject from the uiService is also subscribed in order to show / hide
   * the loading spinner.
   */
  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        // the recipe is assigned to the one resolved by the recipe resolver
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

  /**
   * onAddRecipeToMenu is responsible for opening the dialog modal where the user
   * picks the date and meal to save the selected recipe. If the modal is closed with
   * a truthy result, then this method calls the addRecipe method from the recipesService
   * which is responsible for saving the recipe to the DB.
   */
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

  /**
   * onRemoveRecipeFromMenu is responsible for opening a confirmation modal
   * and (if the deletion is confirmed by the user) for calling the
   * removeRecipe method from the recipesService, passing the selected recipe,
   * but also the meal and seconds value fetched by the route.queryParams.
   */
  onRemoveRecipeFromMenu() {
    const dialogRef = this.dialog.open(RecipeRemoveComponent, {
      data: {
        message: `You will cancel ${this.recipe.name}`
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

  /**
   * When destroying the component instance, this lifecycle hooks is meant
   * to unsubscribe the loadingSubs subscription, thus avoiding performance issues.
   */
  ngOnDestroy() {
    if (this.loadingSubs) {
      this.loadingSubs.unsubscribe();
    }
  }

}
