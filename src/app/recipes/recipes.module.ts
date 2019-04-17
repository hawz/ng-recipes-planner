import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipesCalendarComponent } from './recipes-calendar/recipes-calendar.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { ShortenPipe } from '../shared/shorten.pipe';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeAddComponent } from './recipe-add/recipe-add.component';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipesCalendarComponent,
    RecipesListComponent,
    ShortenPipe,
    RecipeDetailsComponent,
    RecipeAddComponent
  ],
  imports: [
    SharedModule,
    RecipesRoutingModule
  ],
  exports: [],
  providers: [],
  entryComponents: [RecipeAddComponent]
})
export class RecipesModule { }
