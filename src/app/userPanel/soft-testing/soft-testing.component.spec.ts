import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftTestingComponent } from './soft-testing.component';

describe('SoftTestingComponent', () => {
  let component: SoftTestingComponent;
  let fixture: ComponentFixture<SoftTestingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SoftTestingComponent]
    });
    fixture = TestBed.createComponent(SoftTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
