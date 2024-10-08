import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AdminTeamComponent } from './admin-team.component';

describe('AdminTeamComponent', () => {
  let component: AdminTeamComponent;
  let fixture: ComponentFixture<AdminTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AdminTeamComponent], // or the relevant component
      // any other providers or declarations
    }).compileComponents();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
