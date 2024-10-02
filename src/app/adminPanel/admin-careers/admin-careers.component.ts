import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-careers',
  templateUrl: './admin-careers.component.html',
  styleUrls: ['./admin-careers.component.css']
})
export class AdminCareersComponent {
  uploadedCVUrl: string = '';

  handleFileInput(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.uploadedCVUrl = URL.createObjectURL(file);
    }
  }
}
