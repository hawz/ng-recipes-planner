/**
 *        RECIPE-REMOVE COMPONENT
 *
 * The RecipeRemoveComponent is responsible for handling the dialog modal
 * which pops up when the user decides to remove a certain recipe from the
 * week calendar. Basically it's a confirm modal.
 *
 * It returns true / false to the calling component according to the user decision.
 */

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-recipe-remove',
  templateUrl: './recipe-remove.component.html',
  styleUrls: ['./recipe-remove.component.css']
})
export class RecipeRemoveComponent {

  constructor(
    public dialogRef: MatDialogRef<RecipeRemoveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

}
