import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOpinionsComponent } from './admin-opinions.component';

describe('AdminOpinionsComponent', () => {
  let component: AdminOpinionsComponent;
  let fixture: ComponentFixture<AdminOpinionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminOpinionsComponent]
    });
    fixture = TestBed.createComponent(AdminOpinionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
