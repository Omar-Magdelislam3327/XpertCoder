/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component } from '@angular/core';
import { CareersApiService } from 'src/app/services/careers-api.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import Swal from 'sweetalert2';

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
    { value: 'FrontEndDeveloper', label: 'Frontend Developer' },
    { value: 'BackEndDeveloper', label: 'Backend Developer' },
    { value: 'FlutterDeveloper', label: 'Flutter Developer' },
    { value: "UiUxDesign", label: 'UI/UX Designer' },
    { value: 'Sales', label: 'Sales' },
    { value: 'EMarketer', label: 'e-marketer' },
    { value: 'VideoEditor', label: 'Video Editor' },
    { value: 'GraphicDesigner', label: 'Graphic Designer' },
  ];

  constructor(private api: CareersApiService) {
    this.getCareers();
  }

  getCareers() {
    this.api.getCarrers().subscribe((data: any) => {
      this.careers = data;
      console.log(data);

    });
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
        this.api.deleteCareers(id).subscribe(
          () => {
            this.getCareers();
          },
          (error) => {
            Swal.fire({
              title: 'Error!',
              text: 'There was an issue deleting the message.',
              icon: 'error',
              confirmButtonText: 'Retry',
              confirmButtonColor: '#00816F',
            })
          }
        );
      }
    });
  }

  filterCareersByCategory() {
    if (this.selectedJobCategory) {
      this.api.getCarrers().subscribe((data: any) => {
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
  downloadFile(fileUrl: string): void {
    fetch(fileUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileUrl.split('/').pop() || 'download';
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(err => console.error('Download failed:', err));
  }
}
