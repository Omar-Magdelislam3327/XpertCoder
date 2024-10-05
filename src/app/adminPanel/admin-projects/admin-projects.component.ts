import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Projects } from 'src/app/modules/projects';
import { ProjectsApiService } from 'src/app/services/projects-api.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-admin-projects',
  templateUrl: './admin-projects.component.html',
  styleUrls: ['./admin-projects.component.css'],
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
export class AdminProjectsComponent implements OnInit {
  projectForm: FormGroup;
  projects: Projects[] = [];
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
    this.fetchProjects();
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
          this.projectForm.reset();
          this.features.clear();
          this.addFeature();
          this.fetchProjects();
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
  remove(id: any) {
    this.api.delete(id).subscribe({
      next: () => {
        this.fetchProjects();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
