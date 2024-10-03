import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogApiService } from 'src/app/services/blog-api.service';
import { Blogs } from 'src/app/modules/blogs';

@Component({
  selector: 'app-admin-blog-edit',
  templateUrl: './admin-blog-edit.component.html',
  styleUrls: ['./admin-blog-edit.component.css']
})
export class AdminBlogEditComponent implements OnInit {
  blogForm: FormGroup;
  blogId: number;

  constructor(
    private route: ActivatedRoute,
    private api: BlogApiService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      type: ['', Validators.required]
    });

    this.blogId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.loadBlog(this.blogId);
  }

  loadBlog(id: number): void {
    this.api.getById(id).subscribe((data: Blogs) => {
      if (data) {
        this.blogForm.patchValue(data);
      }
    }, error => {
      console.error('Failed to load blog:', error);
    });
  }

  update(): void {
    if (this.blogForm.valid) {
      this.api.put(this.blogId, this.blogForm.value).subscribe(() => {
        this.router.navigate(['/admin/blogs']);
      }, error => {
        console.error('Failed to update blog:', error);
      });
    } else {
      console.warn('Form is invalid');
    }
  }

  delete(): void {
    if (confirm('Are you sure you want to delete this blog?')) {
      this.api.delete(this.blogId).subscribe(() => {
        this.router.navigate(['/admin/blogs']);
      }, error => {
        console.error('Failed to delete blog:', error);
      });
    }
  }
}
