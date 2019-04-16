import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DailyMenu } from '../dailyMenu.model';

@Component({
  selector: 'app-recipes-calendar',
  templateUrl: './recipes-calendar.component.html',
  styleUrls: ['./recipes-calendar.component.css']
})
export class RecipesCalendarComponent implements OnInit {
  today: Date = new Date();
  weekMenu: DailyMenu[] = [];

  constructor() { }

  ngOnInit() {
    // here we should search for recipes saved for the next week ahead
    for (let index = 0; index < 7; index++) {
      const nextDay = new Date();
      nextDay.setDate(nextDay.getDate() + index);
      const dailyMenu = {
        date: nextDay,
        day: moment(nextDay).format('dddd'),
        lunch: [],
        breakfast: [],
        dinner: []
      };
      this.weekMenu.push(dailyMenu);
    }
  }

}
