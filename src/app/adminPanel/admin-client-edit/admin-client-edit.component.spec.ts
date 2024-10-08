import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AdminClientEditComponent } from './admin-client-edit.component';

describe('AdminClientEditComponent', () => {
  let component: AdminClientEditComponent;
  let fixture: ComponentFixture<AdminClientEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AdminClientEditComponent], // or the relevant component
      // any other providers or declarations
    }).compileComponents();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
