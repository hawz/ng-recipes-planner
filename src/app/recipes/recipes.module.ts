import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipesCalendarComponent } from './recipes-calendar/recipes-calendar.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';

@NgModule({
  declarations: [RecipesComponent, RecipesCalendarComponent, RecipesListComponent],
  imports: [
    SharedModule,
    RecipesRoutingModule
  ],
  exports: [],
  providers: []
})
export class RecipesModule { }
