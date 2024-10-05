import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Blogs } from 'src/app/modules/blogs';
import { BlogApiService } from 'src/app/services/blog-api.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-admin-blogs',
  templateUrl: './admin-blogs.component.html',
  styleUrls: ['./admin-blogs.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class AdminBlogsComponent implements OnInit {
  blogForm: FormGroup;
  blogs: Blogs[] = [];
  isEditMode: boolean = false;
  currentBlogId: number | null = null;

  constructor(private api: BlogApiService, private fb: FormBuilder) {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      type: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadBlogs();
  }

  loadBlogs(): void {
    this.api.get().subscribe((data: any) => {
      this.blogs = data;
    });
  }

  add(): void {
    if (this.blogForm.valid) {
      if (this.isEditMode && this.currentBlogId !== null) {
        this.api.put(this.currentBlogId, this.blogForm.value).subscribe(() => {
          this.resetForm();
          this.loadBlogs();
        });
      } else {
        this.api.post(this.blogForm.value).subscribe(() => {
          this.resetForm();
          this.loadBlogs();
        });
      }
    }
  }

  remove(id: any) {
    this.api.delete(id).subscribe(() => {
      this.loadBlogs();
    });
  }
  edit(blog: Blogs): void {
    this.isEditMode = true;
    this.currentBlogId = blog.id;
    this.blogForm.patchValue(blog);
  }

  resetForm(): void {
    this.blogForm.reset();
    this.isEditMode = false;
    this.currentBlogId = null;
  }
}
