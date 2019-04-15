import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './recipes/recipes.component';

@NgModule({
  declarations: [RecipesComponent],
  imports: [
    CommonModule,
    RecipesRoutingModule
  ],
  exports: [],
  providers: []
})
export class RecipesModule { }
