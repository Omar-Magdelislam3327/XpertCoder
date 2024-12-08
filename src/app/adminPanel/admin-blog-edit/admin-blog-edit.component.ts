/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogApiService } from 'src/app/services/blog-api.service';
import { Blogs } from 'src/app/modules/blogs';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-admin-blog-edit',
  templateUrl: './admin-blog-edit.component.html',
  styleUrls: ['./admin-blog-edit.component.css'],
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
export class AdminBlogEditComponent {
  blogForm: FormGroup;
  blogId: number;
  blogs: Blogs[] = [];
  isEditMode = false;
  currentBlogId: number | null = null;
  constructor(
    private route: ActivatedRoute,
    private api: BlogApiService,
    private fb: FormBuilder,
    private router: Router
  ) {
    window.scrollTo(0, 0);
    this.blogForm = this.fb.group({
      Title: ['', Validators.required],
      Description: ['', Validators.required],
      Image: ['', Validators.required],
      Type: ['', Validators.required]
    });

    this.blogId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.loadBlog(this.blogId);
  }

  loadBlog(id: number): void {
    this.api.getBlogById(id).subscribe(
      (data: Blogs) => {
        console.log('Loaded blog data:', data);
        if (data) {
          this.blogForm.patchValue({
            Title: data.title,
            Description: data.description,
            // Type: this.mapTypeToSelectValue(data.type),
            Type: data.type,
            Image: data.image,
          });
        }
        this.blogForm.get('Description')!.setValue(data.description || '');
      },
      (error) => {
        console.error('Failed to load blog:', error);
      }
    );
  }

  private mapTypeToSelectValue(type: string): string {
    const typeMapping: { [key: string]: string } = {
      'Web Development': 'Web',
      'Mobile Development': 'Mobile',
      "Ui/UX Designs": 'Ui',
      'Software Testing': 'Testing',
    };
    return typeMapping[type] || '';
  }


  // update(): void {
  //   if (this.blogForm.valid) {
  //     this.api.putBlog(this.blogId, this.blogForm.value).subscribe(() => {
  //       this.router.navigate(['/admin/blogs']);
  //     }, error => {
  //       console.error('Failed to update blog:', error);
  //     });
  //   } else {
  //     console.warn('Form is invalid');
  //   }
  // }
  selectedFile!: any;
  fileSize: number | null = null;
  fileTooLarge: boolean = false;
  invalidFileType: boolean = false;
  readonly maxFileSizeInMB: number = 50;
  update(): void {
    if (this.blogForm.invalid) {
      console.log("Form is invalid");
      return;
    }

    const formData = new FormData();

    if (this.selectedFile) {
      formData.append('Image', this.selectedFile);
      console.log('Image appended:', this.selectedFile);
    }

    formData.append('Title', this.blogForm.get('Title')?.value || '');
    formData.append('Description', this.blogForm.get('Description')?.value || '');
    formData.append('Type', this.blogForm.get('Type')?.value || '');

    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    this.api.putBlog(this.blogId, formData).subscribe(
      () => {
        this.router.navigate(['/admin/blogs']);
      },
      (error) => {
        console.error('Failed to update blog:', error);
      }
    );
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log('File selected:', this.selectedFile);
    }

    if (this.selectedFile) {
      const file = this.selectedFile;
      this.fileSize = file.size / (1024 * 1024);
      if (this.fileSize > this.maxFileSizeInMB) {
        this.fileTooLarge = true;
        this.invalidFileType = false;
        console.log("File size is too large to be uploaded");
        return;
      } else {
        this.fileTooLarge = false;
      }
      if (!file.type.startsWith('image/')) {
        this.invalidFileType = true;
        console.log("Invalid file type");
        return;
      } else {
        this.invalidFileType = false;
      }
    }
  }

}
