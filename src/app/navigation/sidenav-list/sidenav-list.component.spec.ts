import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavListComponent } from './sidenav-list.component';
import { MaterialModule } from 'src/app/material.module';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';



describe('SidenavListComponent', () => {
  let component: SidenavListComponent;
  let fixture: ComponentFixture<SidenavListComponent>;

  beforeEach(async(() => {
    const authServiceStub = {
      logout: () => { },
      authChange: {
        subscribe() {
          return {
            unsubscribe() {}
          };
        }
      }
    };

    TestBed.configureTestingModule({
      declarations: [SidenavListComponent],
      imports: [MaterialModule],
      providers: [
        { provide: AuthService, useValue: authServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
