import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProjectEditComponent } from './admin-project-edit.component';

describe('AdminProjectEditComponent', () => {
  let component: AdminProjectEditComponent;
  let fixture: ComponentFixture<AdminProjectEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminProjectEditComponent]
    });
    fixture = TestBed.createComponent(AdminProjectEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
