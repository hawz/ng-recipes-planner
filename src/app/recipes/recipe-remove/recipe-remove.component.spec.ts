import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeRemoveComponent } from './recipe-remove.component';
import { MaterialModule } from 'src/app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

describe('RecipeRemoveComponent', () => {
  let component: RecipeRemoveComponent;
  let fixture: ComponentFixture<RecipeRemoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeRemoveComponent ],
      imports: [
        BrowserAnimationsModule,
        MaterialModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { recipe: { name: 'Test Recipe' } } },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
