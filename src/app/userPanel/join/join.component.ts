import { Component, OnInit } from '@angular/core';
import { CareersApiService } from 'src/app/services/careers-api.service';
import { Careers } from 'src/app/modules/careers';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

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
export class JoinComponent {
  career: Careers = new Careers();
  uploadedCVUrl: string = '';
  enabledCategories: string[] = [];

  jobCategories = [
    { value: 'Frontend Developer', label: 'Frontend Developer' },
    { value: 'Backend Developer', label: 'Backend Developer' },
    { value: 'Flutter Developer', label: 'Flutter Developer' },
    { value: 'UI/UX Designer', label: 'UI/UX Designer' },
    { value: 'Sales', label: 'Sales' },
    { value: 'e-marketer', label: 'e-marketer' },
    { value: 'Video Editor', label: 'Video Editor' },
    { value: 'Graphic Designer', label: 'Graphic Designer' },
  ];

  constructor(private careersApiService: CareersApiService) { }


  handleFileInput(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.career.cv = file.name;
    }
  }

  submitApplication() {
    if (this.validateForm()) {
      this.careersApiService.post(this.career).subscribe({
        next: (response) => {
          console.log('Application submitted successfully:', response);
          location.reload();
        },
        error: (error) => {
          console.log('Error submitting application:', error);
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }

  validateForm(): boolean {
    return (
      !!this.career.title &&
      !!this.career.name &&
      !!this.career.email &&
      !!this.career.phone &&
      !!this.career.salary &&
      !!this.career.experience &&
      !!this.career.cv
    );
  }

  isSubmitEnabled(): boolean {
    return this.validateForm(); // Button is enabled if form is valid
  }
}
