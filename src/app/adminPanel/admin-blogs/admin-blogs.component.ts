import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Blogs } from 'src/app/modules/blogs';
import { BlogApiService } from 'src/app/services/blog-api.service';

@Component({
  selector: 'app-admin-blogs',
  templateUrl: './admin-blogs.component.html',
  styleUrls: ['./admin-blogs.component.css']
})
export class AdminBlogsComponent implements OnInit {
  blogForm: FormGroup;
  blogs: Blogs[] = []; // Array to hold the list of blogs
  isEditMode: boolean = false; // Flag to track edit mode
  currentBlogId: number | null = null; // ID of the blog currently being edited

  constructor(private api: BlogApiService, private fb: FormBuilder) {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      type: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadBlogs(); // Load blogs on component initialization
  }

  loadBlogs(): void {
    this.api.get().subscribe((data: any) => {
      this.blogs = data; // Populate the blogs array
    });
  }

  add(): void {
    if (this.blogForm.valid) {
      if (this.isEditMode && this.currentBlogId !== null) {
        // If in edit mode, update the existing blog
        this.api.put(this.currentBlogId, this.blogForm.value).subscribe(() => {
          this.resetForm();
          this.loadBlogs(); // Reload blogs after update
        });
      } else {
        // Otherwise, add a new blog
        this.api.post(this.blogForm.value).subscribe(() => {
          this.resetForm();
          this.loadBlogs(); // Reload blogs after adding
        });
      }
    }
  }

  edit(blog: Blogs): void {
    this.isEditMode = true; // Set edit mode to true
    this.currentBlogId = blog.id; // Store the ID of the blog to edit
    this.blogForm.patchValue(blog); // Populate the form with blog data
  }

  resetForm(): void {
    this.blogForm.reset();
    this.isEditMode = false; // Reset edit mode flag
    this.currentBlogId = null; // Clear the current blog ID
  }
}
