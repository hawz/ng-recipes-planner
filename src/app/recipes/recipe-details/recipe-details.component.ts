import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipesService } from '../recipes.service';
import { Recipe } from '../recipe.model';
import { MatDialog } from '@angular/material';
import { RecipeAddComponent } from '../recipe-add/recipe-add.component';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  id: number;
  recipe: Recipe = {
    name: '',
    category: '',
    subcategory: '',
    recipeId: this.id,
    imageURL: '',
    imageSmallURL: ''
  };

  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipesService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipesService.fetchRecipe(this.id)
          .subscribe((recipe: Recipe) => {
            this.recipe = recipe;
          });
      }
    );
  }

  onAddRecipeToMenu() {
    console.log('add the recipe to the menu:', this.recipe);
    const dialogRef = this.dialog.open(RecipeAddComponent, {
      data: {
        recipe: this.recipe
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('modal closed with result: ', result);
      if (result) {
        console.log('ADD dailyMenu to DB');
        // ADD dailyMenu to DB
      }
    });
  }

}
