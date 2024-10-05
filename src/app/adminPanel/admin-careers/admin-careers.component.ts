import { Component } from '@angular/core';
import { CareersApiService } from 'src/app/services/careers-api.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-admin-careers',
  templateUrl: './admin-careers.component.html',
  styleUrls: ['./admin-careers.component.css'],
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
export class AdminCareersComponent {
  uploadedCVUrl: string = '';
  careers: any[] = [];
  selectedJobCategory: string = '';

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

  constructor(private api: CareersApiService) {
    this.getCareers();
  }

  getCareers() {
    this.api.get().subscribe((data: any) => {
      this.careers = data;
    });
  }

  remove(id: any) {
    this.api.delete(id).subscribe(() => {
      this.getCareers();
    });
  }

  filterCareersByCategory() {
    if (this.selectedJobCategory) {
      this.api.get().subscribe((data: any) => {
        this.careers = data.filter((career: any) => career.title === this.selectedJobCategory);
      });
    } else {
      this.getCareers();
    }
  }
  resetSelection() {
    this.selectedJobCategory = '';
    this.getCareers();
  }
}
