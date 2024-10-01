import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCareersComponent } from './admin-careers.component';

describe('AdminCareersComponent', () => {
  let component: AdminCareersComponent;
  let fixture: ComponentFixture<AdminCareersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCareersComponent]
    });
    fixture = TestBed.createComponent(AdminCareersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
