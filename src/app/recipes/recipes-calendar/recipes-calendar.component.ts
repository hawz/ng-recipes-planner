import { Component, OnInit, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { DailyMenu } from '../dailyMenu.model';
import { Subscription } from 'rxjs';
import { RecipesService } from '../recipes.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipes-calendar',
  templateUrl: './recipes-calendar.component.html',
  styleUrls: ['./recipes-calendar.component.css']
})
export class RecipesCalendarComponent implements OnInit, OnDestroy {
  today: Date = new Date();
  weekMenu: DailyMenu[];
  recipesSubscription: Subscription;

  constructor(private recipesService: RecipesService) { }

  ngOnInit() {
    // here we should search for recipes saved for the next week ahead
    this.recipesSubscription = this.recipesService.menuChanged.subscribe(
      (recipes: Recipe[]) => {
        this.createWeekMenu(recipes);
      }
    );

    this.recipesService.getWeekMenu();
  }

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
    // console.log(this.weekMenu);
  }

  ngOnDestroy() {
    if (this.recipesSubscription) {
      this.recipesSubscription.unsubscribe();
    }
  }

}
