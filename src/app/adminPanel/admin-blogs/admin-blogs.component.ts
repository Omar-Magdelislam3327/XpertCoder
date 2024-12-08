/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Blogs } from 'src/app/modules/blogs';
import { BlogApiService } from 'src/app/services/blog-api.service';
import Swal from 'sweetalert2';

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
  isEditMode = false;
  currentBlogId: number | null = null;

  constructor(private api: BlogApiService, private fb: FormBuilder) {
    this.blogForm = this.fb.group({
      Title: ['', Validators.required],
      Description: ['', Validators.required],
      Image: ['', Validators.required],
      Type: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadBlogs();
  }
  currentPage!: number;
  pageSize: number = 12;
  loadBlogs(): void {
    this.api.getBlogs(this.currentPage, this.pageSize).subscribe((data: any) => {
      this.blogs = data.data;
    });
  }
  fileSize: number | null = null;
  fileTooLarge: boolean = false;
  invalidFileType: boolean = false;
  readonly maxFileSizeInMB: number = 50;
  selectedFile: File | null = null;
  add(): void {
    if (this.blogForm.invalid) {
      return;
    }

    const formData = new FormData();

    if (this.selectedFile) {
      formData.append('Image', this.selectedFile);
    } else {
      return;
    }

    formData.append('Title', this.blogForm.get('Title')?.value || '');
    formData.append('Description', this.blogForm.get('Description')?.value || '');
    formData.append('Type', this.blogForm.get('Type')?.value || '');

    if (this.invalidFileType || this.fileTooLarge) {
      return;
    }


    this.api.postBlog(formData).subscribe(
      (response) => {
        this.resetForm();
        this.loadBlogs();
        console.log(response);
        Swal.fire({
          title: 'Blog added successfully!',
          icon: 'success',
          confirmButtonText: 'Okay',
          confirmButtonColor: "#00816F"
        })
      },
      (error) => {
        console.log(error);
      }
    );
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }

    if (input?.files?.length) {
      const file = input.files[0];
      this.fileSize = file.size / (1024 * 1024);
      if (this.fileSize > this.maxFileSizeInMB) {
        this.fileTooLarge = true;
        this.invalidFileType = false;
        return;
      } else {
        this.fileTooLarge = false;
      }
      if (!file.type.startsWith('image/')) {
        this.invalidFileType = true;
        return;
      } else {
        this.invalidFileType = false;
      }
    }
  }
  remove(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00816F',
      cancelButtonColor: '#c4002b',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.deleteBlog(id).subscribe(
          () => {
            this.loadBlogs();
          },
          (error) => {
            Swal.fire({
              title: 'Error!',
              text: 'There was an issue deleting the blog.',
              icon: 'error',
              confirmButtonText: 'Retry',
              confirmButtonColor: "#00816F"
            })
          }
        );
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
