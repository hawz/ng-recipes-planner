import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeAddComponent } from './recipe-add.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

describe('RecipeAddComponent', () => {
  let component: RecipeAddComponent;
  let fixture: ComponentFixture<RecipeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeAddComponent],
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        MaterialModule,
        FlexLayoutModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { recipe: { name: 'Test Recipe' } } },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
