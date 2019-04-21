import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { RecipesComponent } from './recipes.component';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RecipesCalendarComponent } from '../recipes-calendar/recipes-calendar.component';
import { RecipesListComponent } from '../recipes-list/recipes-list.component';
import { ShortenPipe } from 'src/app/shared/shorten.pipe';
import { RecipesService } from '../recipes.service';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RecipesComponent', () => {
  let component: RecipesComponent;
  let fixture: ComponentFixture<RecipesComponent>;

  beforeEach(async(() => {
    const recipesServiceStub = {
      menuChanged: {
        subscribe() {}
      },
      recipesChanged: {
        subscribe() {}
      },
      resultsNumberChanged: {
        subscribe() {}
      },
      getWeekMenu() {},
      fetchRecipes() {
        return of([]);
      }
    };

    TestBed.configureTestingModule({
      declarations: [
        RecipesComponent,
        RecipesCalendarComponent,
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
      providers: [{ provide: RecipesService, useValue: recipesServiceStub }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
