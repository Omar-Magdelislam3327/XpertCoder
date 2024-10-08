import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { JoinComponent } from './join.component';

describe('JoinComponent', () => {
  let component: JoinComponent;
  let fixture: ComponentFixture<JoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [JoinComponent], // Replace with your component's name
      providers: [
        // Add any other providers needed for your tests
      ],
    }).compileComponents();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
