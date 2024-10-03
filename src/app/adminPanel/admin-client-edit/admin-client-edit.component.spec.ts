import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClientEditComponent } from './admin-client-edit.component';

describe('AdminClientEditComponent', () => {
  let component: AdminClientEditComponent;
  let fixture: ComponentFixture<AdminClientEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminClientEditComponent]
    });
    fixture = TestBed.createComponent(AdminClientEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
