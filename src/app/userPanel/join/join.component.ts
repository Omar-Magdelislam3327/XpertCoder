import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CareersApiService } from 'src/app/services/careers-api.service';
import { Careers } from 'src/app/modules/careers';
import { trigger, transition, style, animate } from '@angular/animations';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css'],
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
export class JoinComponent implements OnInit {
  joinForm!: FormGroup;
  selectedFile: any | null = null;
  fileTooLarge = false;
  invalidFileType = false;

  constructor(private careersApiService: CareersApiService, private fb: FormBuilder) {
    window.scrollTo(0, 0);
  }

  ngOnInit(): void {
    this.joinForm = this.fb.group({
      Name: ['', Validators.required],
      Email: ['', [Validators.required]],
      Phone: ['', [Validators.required]],
      Salary: ['', Validators.required],
      Experience: ['', Validators.required],
      File: ['', Validators.required],
      Title: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.joinForm.invalid || this.fileTooLarge || this.invalidFileType) {
      Swal.fire({
        title: 'Error',
        text: 'Please enter valid data in all fields',
        icon: 'error',
        confirmButtonText: 'Retry',
        confirmButtonColor: '#00816F',
      })
      return;
    }

    const formData = new FormData();

    if (this.selectedFile) {
      formData.append('File', this.selectedFile);
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Please select a valid file type and a file name to upload to the server',
        icon: 'error',
        confirmButtonText: 'Okay',
        confirmButtonColor: '#00816F',
      })
      return;
    }

    formData.append('Name', this.joinForm.get('Name')?.value || '');
    formData.append('Email', this.joinForm.get('Email')?.value || '');
    formData.append('Phone', this.joinForm.get('Phone')?.value || '');
    formData.append('Salary', this.joinForm.get('Salary')?.value || '');
    formData.append('Experience', this.joinForm.get('Experience')?.value || '');
    formData.append('Title', this.joinForm.get('Title')?.value || '');

    this.careersApiService.postCareers(formData).subscribe(
      (response) => {
        Swal.fire({
          title: 'Message sent',
          text: 'Thank you for your application. We will get back to you shortly.',
          icon: 'success',
          confirmButtonText: 'Okay',
          confirmButtonColor: '#00816F',
        })
        this.resetForm();
        console.log("Sent message", response);

      },
      (error) => {
        console.log(error);
        Swal.fire({
          title: 'Error',
          text: 'There was an error sending your application. Please try again later.',
          icon: 'error',
          confirmButtonText: 'Retry',
          confirmButtonColor: '#00816F',
        })
      }
    );
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const fileSize = file.size / (1024 * 1024);
      if (fileSize > 5) {
        this.fileTooLarge = true;
        this.invalidFileType = false;
        return;
      } else {
        this.fileTooLarge = false;
      }

      if (!file.type.startsWith('application/pdf')) {
        this.invalidFileType = true;
        return;
      } else {
        this.invalidFileType = false;
      }

      this.selectedFile = file;
    }
  }

  resetForm(): void {
    this.joinForm.reset();
    this.selectedFile = null;
    this.fileTooLarge = false;
    this.invalidFileType = false;
  }

}
