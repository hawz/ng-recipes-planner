import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './recipes/recipes.component';

@NgModule({
  declarations: [RecipesComponent],
  imports: [
    SharedModule,
    RecipesRoutingModule
  ],
  exports: [],
  providers: []
})
export class RecipesModule { }
