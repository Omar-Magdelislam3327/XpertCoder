import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AdminBlogEditComponent } from './admin-blog-edit.component';

describe('AdminBlogEditComponent', () => {
  let component: AdminBlogEditComponent;
  let fixture: ComponentFixture<AdminBlogEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AdminBlogEditComponent],
    }).compileComponents();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
