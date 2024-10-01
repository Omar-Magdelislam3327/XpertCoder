import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-projects',
  templateUrl: './admin-projects.component.html',
  styleUrls: ['./admin-projects.component.css']
})
export class AdminProjectsComponent {
  features: string[] = ['']; // Initially one feature

  // Add new feature input
  addFeature() {
    this.features.push('');
  }

  // Remove a feature input (optional)
  removeFeature(index: number) {
    this.features.splice(index, 1);
  }

  // Submit the form
  onSubmit() {
    console.log(this.features);
  }
}
