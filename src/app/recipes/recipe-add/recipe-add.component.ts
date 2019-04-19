/**
 *        RECIPE-ADD COMPONENT
 *
 * The RecipeAddComponent is responsible for handling the dialog modal
 * which pops up when the user decides to add a certain recipe to the
 * week calendar. So it handles the modal instance and the data passed
 * to the modal and lets the user choose on which day the selected recipe
 * will be inserted and for which meal of that day (breakfast, lunch or dinner).
 *
 * Once the user has chosen, the modal returns the same object recipe to the
 * calling method of the RecipeDetails component but with the 'date' and 'meal'
 * properties set.
 */
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

  /**
   * @param dialogRef reference to the dialog modal instance
   * @param data data passed to the modal from the calling component, in this case it'll contain the selected recipe
   */
  constructor(
    public dialogRef: MatDialogRef<RecipeAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  /**
   * When initializing the recipeAdd component, the endDate property will be initialized
   * and set to 6 days ahead from today: that's the upper limit for the date field of the
   * selected recipe as we don't want the user to be able to insert any recipe after that
   * date.
   */
  ngOnInit() {
    this.endDate.setDate(this.endDate.getDate() + 6);
  }

  /**
   * The addRecipe method confirms the user choice when adding a recipe to the
   * week calendar. It's responsible for closing the modal and returning the recipe
   * completed with date and meal properties to the RecipeDetails component.
   *
   * @param mealForm it contains the chosen date and meal for the given recipe
   */
  addRecipe(mealForm: NgForm) {
    this.dialogRef.close({
      ...this.data.recipe,
      date: mealForm.value.selectedDate,
      meal: mealForm.value.selectedMeal
    });
  }

  /**
   * The onClose method closes the dialog modal.
   */
  onClose() {
    this.dialogRef.close();
  }

}
