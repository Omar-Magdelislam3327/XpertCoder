import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AdminProjectEditComponent } from './admin-project-edit.component';

describe('AdminProjectEditComponent', () => {
  let component: AdminProjectEditComponent;
  let fixture: ComponentFixture<AdminProjectEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AdminProjectEditComponent], // or the relevant component
      // any other providers or declarations
    }).compileComponents();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
