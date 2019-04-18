import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesListComponent } from './recipes-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ShortenPipe } from 'src/app/shared/shorten.pipe';
import { MaterialModule } from 'src/app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { RecipesService } from '../recipes.service';
import { of } from 'rxjs';

describe('RecipesListComponent', () => {
  let component: RecipesListComponent;
  let fixture: ComponentFixture<RecipesListComponent>;

  beforeEach(async(() => {
    const recipesServiceStub = {
      menuChanged: {
        subscribe() { }
      },
      recipesChanged: {
        subscribe() { }
      },
      resultsNumberChanged: {
        subscribe() { }
      },
      getWeekMenu() { },
      fetchRecipes() {
        return of([]);
      }
    };

    TestBed.configureTestingModule({
      declarations: [
        RecipesListComponent,
        ShortenPipe
      ],
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        { provide: RecipesService, useValue: recipesServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
