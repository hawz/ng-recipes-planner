import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipesCalendarComponent } from './recipes-calendar/recipes-calendar.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { ShortenPipe } from '../shared/shorten.pipe';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipesCalendarComponent,
    RecipesListComponent,
    ShortenPipe
  ],
  imports: [
    SharedModule,
    RecipesRoutingModule
  ],
  exports: [],
  providers: []
})
export class RecipesModule { }
