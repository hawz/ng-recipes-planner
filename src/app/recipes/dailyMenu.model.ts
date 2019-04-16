import { Recipe } from './recipe.model';

export interface DailyMenu {
  day: string;
  date: Date;
  breakfast: Recipe[];
  lunch: Recipe[];
  dinner: Recipe[];
}
