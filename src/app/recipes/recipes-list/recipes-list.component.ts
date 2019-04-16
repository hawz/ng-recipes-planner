import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  searchRecipe(event) {
    if (event.key === 'Enter') {
      console.log('Pressed enter', event.target.value);
    }
  }
}
