import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesCalendarComponent } from './recipes-calendar.component';

describe('RecipesCalendarComponent', () => {
  let component: RecipesCalendarComponent;
  let fixture: ComponentFixture<RecipesCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipesCalendarComponent ]
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
