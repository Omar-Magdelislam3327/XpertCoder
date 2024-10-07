import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Blogs } from 'src/app/modules/blogs';
import { BlogApiService } from 'src/app/services/blog-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-blogs',
  templateUrl: './admin-blogs.component.html',
  styleUrls: ['./admin-blogs.component.css'],
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
      type: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadBlogs();
  }

  loadBlogs(): void {
    this.api.get().subscribe((data: Blogs[]) => {
      this.blogs = data;
    });
  }

  add(): void {
    this.api.post(this.blogForm.value).subscribe(() => {
      this.loadBlogs();
      this.resetForm();
    });
  }

  remove(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00816F',
      cancelButtonColor: '#c4002b',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.delete(id).subscribe(() => {
          this.loadBlogs();
          Swal.fire(
            'Deleted!',
            'Your blog has been deleted.',
            'success'
          );
        });
      }
    });
  }

  edit(blog: Blogs): void {
    this.isEditMode = true;
    this.currentBlogId = blog.id;
    this.blogForm.patchValue({
      title: blog.title,
      description: blog.description,
      image: blog.image,
      type: blog.type,
    });
  }

  resetForm(): void {
    this.blogForm.reset();
  }
}
