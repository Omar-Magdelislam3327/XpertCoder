import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SoftTestingComponent } from './soft-testing.component';

describe('SoftTestingComponent', () => {
  let component: SoftTestingComponent;
  let fixture: ComponentFixture<SoftTestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SoftTestingComponent], // Replace with your component's name
      providers: [
        // Add any other providers needed for your tests
      ],
    }).compileComponents();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
