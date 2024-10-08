import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AdminTeamEditComponent } from './admin-team-edit.component';

describe('AdminTeamEditComponent', () => {
  let component: AdminTeamEditComponent;
  let fixture: ComponentFixture<AdminTeamEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AdminTeamEditComponent], // or the relevant component
      // any other providers or declarations
    }).compileComponents();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
