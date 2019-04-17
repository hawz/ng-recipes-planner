import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-recipe-add',
  templateUrl: './recipe-add.component.html',
  styleUrls: ['./recipe-add.component.css']
})
export class RecipeAddComponent implements OnInit {
  date = new Date();
  endDate = new Date();
  meals = ['breakfast', 'lunch', 'dinner'];

  constructor(
    public dialogRef: MatDialogRef<RecipeAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.endDate.setDate(this.endDate.getDate() + 6);
  }

  addRecipe(mealForm: NgForm) {
    this.dialogRef.close({
      ...this.data.recipe,
      date: mealForm.value.selectedDate,
      meal: mealForm.value.selectedMeal
    });
  }

  onClose() {
    this.dialogRef.close();
  }

}
