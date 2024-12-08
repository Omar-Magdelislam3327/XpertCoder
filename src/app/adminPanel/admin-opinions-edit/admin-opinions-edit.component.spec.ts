import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOpinionsEditComponent } from './admin-opinions-edit.component';

describe('AdminOpinionsEditComponent', () => {
  let component: AdminOpinionsEditComponent;
  let fixture: ComponentFixture<AdminOpinionsEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminOpinionsEditComponent]
    });
    fixture = TestBed.createComponent(AdminOpinionsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
