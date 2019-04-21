import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthService } from '../auth.service';
import { MaterialModule } from 'src/app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    const authServiceStub = {
      login: () => { }
    };

    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        MaterialModule,
        AngularFireAuthModule
      ],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
