import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Projects } from 'src/app/modules/projects';
import { ProjectsApiService } from 'src/app/services/projects-api.service';

@Component({
  selector: 'app-admin-projects',
  templateUrl: './admin-projects.component.html',
  styleUrls: ['./admin-projects.component.css']
})
export class AdminProjectsComponent implements OnInit {
  projectForm: FormGroup;
  projects: Projects[] = []; // Specify the type here

  i!: number;
  constructor(private fb: FormBuilder, private api: ProjectsApiService) {
    this.projectForm = this.fb.group({
      projectName: ['', Validators.required],
      projectDescription: ['', Validators.required],
      projectType: ['', Validators.required],
      clientCountry: ['', Validators.required],
      clientIndustry: ['', Validators.required],
      clientLogo: [null, Validators.required],
      clientName: ['', Validators.required],
      projectDuration: ['', Validators.required],
      members: ['', Validators.required],
      clientRating: ['', Validators.required],
      features: this.fb.array([]),
      projectImage: [null, Validators.required],
      clientReview: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.addFeature();
    this.fetchProjects(); // Fetch projects on component init
  }

  get features(): FormArray {
    return this.projectForm.get('features') as FormArray;
  }

  addFeature(): void {
    const featureForm = this.fb.group({
      featureName: ['', Validators.required]
    });
    this.features.push(featureForm);
  }

  removeFeature(index: number): void {
    this.features.removeAt(index);
  }

  add(): void {
    if (this.projectForm.valid) {
      const projectData = {
        ...this.projectForm.value,
      };

      this.api.post(projectData).subscribe(
        response => {
          console.log('Project added successfully:', response);
          this.projectForm.reset();
          this.features.clear();
          this.addFeature();
          this.fetchProjects(); // Refresh projects after adding a new one
        },
        error => {
          console.error('Error adding project:', error);
        }
      );
    }
  }

  fetchProjects(): void {
    this.api.get().subscribe((data: any) => {
      this.projects = data;
    })
  }
}
