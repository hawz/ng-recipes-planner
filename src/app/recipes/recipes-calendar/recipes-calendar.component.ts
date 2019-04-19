/**
 * RECIPES-CALENDAR COMPONENT
 *
 * The RecipesCalendarComponent is responsible for displaying the saved recipes
 * and place them in the week calendar according to their date and selected meal.
 *
 * It prepares an array of dailyMenu objects for the week ahead, which will be then
 * used to display the recipes for each day.
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { DailyMenu } from '../dailyMenu.model';
import { Subscription } from 'rxjs';
import { RecipesService } from '../recipes.service';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipes-calendar',
  templateUrl: './recipes-calendar.component.html',
  styleUrls: ['./recipes-calendar.component.css']
})
export class RecipesCalendarComponent implements OnInit, OnDestroy {
  weekMenu: DailyMenu[];
  recipesSubscription: Subscription;

  /**
   * @param recipesService Recipes service used for fetching recipes
   * @param route Contains info about the active route
   * @param router Router instance used to provide navigation
   */
  constructor(
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  /**
   * When initializing the component, the menuChanged subject is subscribed in order
   * to receive updates for the recipes. Each time this happens, the createWeekMenu
   * method is called, passing the received recipes, in order to build the weekMenu
   * array.
   * Also, the getWeekMenu method from the recipesService is called for the
   * first time,fetching recipes for the week ahead.
   */
  ngOnInit() {
    this.recipesSubscription = this.recipesService.menuChanged.subscribe(
      (recipes: Recipe[]) => {
        this.createWeekMenu(recipes);
      }
    );

    this.recipesService.getWeekMenu();
  }

  /**
   * The createWeekMenu method creates an array of DailyMenu objects
   * starting from a list of recipes. It's meant to create the data
   * to be displayed inside the calendar, filtering for each day, the recipes
   * meant to be eaten for breakfast, lunch or dinner.
   *
   * @param recipes array of recipes to create the weekMenu with
   */
  private createWeekMenu(recipes: Recipe[]) {
    this.weekMenu = [];
    for (let index = 0; index < 7; index++) {
      const nextDay = new Date();
      nextDay.setDate(nextDay.getDate() + index);
      const dailyMenu: DailyMenu = {
        date: nextDay,
        day: moment(nextDay).format('dddd'),
        lunch: recipes.filter(recipe => recipe.meal === 'lunch' && recipe.date.toDate().getDate() === nextDay.getDate()),
        breakfast: recipes.filter(recipe => recipe.meal === 'breakfast' && recipe.date.toDate().getDate() === nextDay.getDate()),
        dinner: recipes.filter(recipe => recipe.meal === 'dinner' && recipe.date.toDate().getDate() === nextDay.getDate())
      };
      this.weekMenu.push(dailyMenu);
    }
  }

  /**
   * when clicking on a single recipe inside the calendar, the user is redirected
   * to the recipe details view, adding some useful query parameters such as the edit flag,
   * the recipe timestamp and the meal.
   */
  onClickRecipe(recipe: Recipe) {
    this.router.navigate([recipe.recipeId], {
      queryParams: {
        edit: '1',
        meal: recipe.meal,
        seconds: recipe.date.seconds
      },
      relativeTo: this.route
    });
  }

  /**
   * when destroying the component, this lifecycle hook removes the recipes subscription
   * calling the unsubscribe() method on it.
   */
  ngOnDestroy() {
    if (this.recipesSubscription) {
      this.recipesSubscription.unsubscribe();
    }
  }

}
