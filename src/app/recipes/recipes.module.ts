import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipesCalendarComponent } from './recipes-calendar/recipes-calendar.component';

@NgModule({
  declarations: [RecipesComponent, RecipesCalendarComponent],
  imports: [
    SharedModule,
    RecipesRoutingModule
  ],
  exports: [],
  providers: []
})
export class RecipesModule { }
