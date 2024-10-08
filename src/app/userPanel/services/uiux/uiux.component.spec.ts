import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UiuxComponent } from './uiux.component';

describe('UiuxComponent', () => {
  let component: UiuxComponent;
  let fixture: ComponentFixture<UiuxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [UiuxComponent], // Replace with your component's name
      providers: [
        // Add any other providers needed for your tests
      ],
    }).compileComponents();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
