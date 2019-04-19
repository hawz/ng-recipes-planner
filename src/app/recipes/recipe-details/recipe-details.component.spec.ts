import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDetailsComponent } from './recipe-details.component';
import { MaterialModule } from 'src/app/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { UIService } from 'src/app/shared/ui.service';
import { RecipesService } from '../recipes.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('RecipeDetailsComponent', () => {
  let component: RecipeDetailsComponent;
  let fixture: ComponentFixture<RecipeDetailsComponent>;

  beforeEach(async(() => {
    const uiServiceStub = {
      loadingStateChanged: {
        subscribe() { }
      }
    };

    const recipesServiceStub = {
      fetchRecipe() {
        return of({ recipeId: 'id' });
      },
      addRecipe() { },
      removeRecipe() { }
    };

    TestBed.configureTestingModule({
      declarations: [
        RecipeDetailsComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        { provide: UIService, useValue: uiServiceStub },
        { provide: RecipesService, useValue: recipesServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeDetailsComponent);
    component = fixture.componentInstance;
    spyOn(component.route.data, 'subscribe');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
