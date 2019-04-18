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
