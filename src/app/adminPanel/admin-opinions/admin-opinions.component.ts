import { trigger, transition, style, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientsApiService } from 'src/app/services/clients-api.service';
import { OpinionsService } from 'src/app/services/opinions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-opinions',
  templateUrl: './admin-opinions.component.html',
  styleUrls: ['./admin-opinions.component.css'],
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
export class AdminOpinionsComponent {
  opinionForm: FormGroup;
  Opinions!: any;
  constructor(private api: OpinionsService, private fb: FormBuilder) {
    this.opinionForm = this.fb.group({
      Name: ['', Validators.required],
      Title: ['', Validators.required],
      Description: ['', Validators.required],
      Image: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadOpinions();
  }
  loadOpinions() {
    this.api.getOpinions().subscribe((data: any) => {
      // this.opinionForm.patchValue(data);
      this.Opinions = data;
    });
  }
  fileSize: number | null = null;
  readonly maxFileSizeInMB: number = 50;
  add(): void {
    if (this.opinionForm.invalid || !this.selectedFile || this.invalidFileType || this.fileTooLarge) {
      console.log('Please complete the form or correct errors.');
      return;
    }

    const formData = new FormData();
    formData.append('Image', this.selectedFile);
    formData.append('Name', this.opinionForm.get('Name')?.value || '');
    formData.append('Title', this.opinionForm.get('Title')?.value || '');
    formData.append('Description', this.opinionForm.get('Description')?.value || '');

    this.api.postOpinion(formData).subscribe(
      (response) => {
        this.loadOpinions();
        console.log('Client added successfully:', response);
        this.opinionForm.reset();
        this.selectedFile = null;
        Swal.fire({
          title: 'Opinion added successfully!',
          icon: 'success',
          confirmButtonText: 'Okay',
          confirmButtonColor: "#00816F"
        })
      },
      (error) => {
        console.log('Error adding client:', error);
        Swal.fire({
          title: 'Error adding opinion',
          text: 'There was an issue adding the opinion.',
          confirmButtonText: 'Retry',
          confirmButtonColor: '#00816F',
        })
      }
    );
  }

  selectedFile: File | null = null;
  fileTooLarge = false;
  invalidFileType = false;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      const maxSize = 5 * 1024 * 1024;

      if (!validTypes.includes(file.type)) {
        this.invalidFileType = true;
        console.log('Invalid file type');
        return;
      }

      if (file.size > maxSize) {
        this.fileTooLarge = true;
        console.log('File too large');
        return;
      }

      this.invalidFileType = false;
      this.fileTooLarge = false;
      this.selectedFile = file;
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
        this.api.deleteOpinion(id).subscribe(
          () => {
            this.loadOpinions();
            Swal.fire({
              title: 'Deleted!',
              text: 'Your opinion has been deleted.',
              icon: 'success',
              confirmButtonText: 'Okay',
              confirmButtonColor: "#00816F"
            })
          },
          (error) => {
            Swal.fire({
              title: 'Error!',
              text: 'There was an issue deleting the blog.',
              confirmButtonText: 'Retry',
              confirmButtonColor: '#00816F',
            })
          }
        );
      }
    });
  }
}
