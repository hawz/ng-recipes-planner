/**
 *
 *            DAILY MENU MODEL
 *
 * The DailyMenu model is used as a container for recipes within the
 * week inside the recipesCalendar component. Basically a week is defined
 * as an array of this kind of objects: DailyMenu[].
 *
 * Each DailyMenu contains:
 *
 * - the day it refers to
 * - the date it refers to
 * - an array of recipes for breakfast
 * - an array of recipes for lunch
 * - an array of recipes for dinner
 *
 */

import { Recipe } from './recipe.model';

export interface DailyMenu {
  day?: string;
  date: Date;
  breakfast: Recipe[];
  lunch: Recipe[];
  dinner: Recipe[];
}
