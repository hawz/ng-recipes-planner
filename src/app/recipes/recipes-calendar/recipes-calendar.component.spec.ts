import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesCalendarComponent } from './recipes-calendar.component';
import { MaterialModule } from 'src/app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { RecipesService } from '../recipes.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ShortenPipe } from 'src/app/shared/shorten.pipe';

describe('RecipesCalendarComponent', () => {
  let component: RecipesCalendarComponent;
  let fixture: ComponentFixture<RecipesCalendarComponent>;

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
        RecipesCalendarComponent,
        ShortenPipe
      ],
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        RouterTestingModule
      ],
      providers: [
        { provide: RecipesService, useValue: recipesServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipesCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
