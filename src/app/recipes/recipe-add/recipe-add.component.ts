import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-recipe-add',
  templateUrl: './recipe-add.component.html',
  styleUrls: ['./recipe-add.component.css']
})
export class RecipeAddComponent implements OnInit {
  date = new Date();
  selectedDate = new Date();
  endDate = new Date();

  meals = ['breakfast', 'lunch', 'dinner'];
  selectedMeal: null;

  constructor(
    public dialogRef: MatDialogRef<RecipeAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.endDate.setDate(this.endDate.getDate() + 6);
  }

  addRecipe() {
    console.log(this.selectedDate, this.selectedMeal);
    this.dialogRef.close({
      ...this.data.recipe,
      date: this.selectedDate,
      meal: this.selectedMeal
    });
  }

  onClose() {
    this.dialogRef.close();
  }

}
