import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsApiService } from 'src/app/services/projects-api.service'; // Import your service here
import { Projects, Feature } from 'src/app/modules/projects'; // Adjust the import path accordingly

@Component({
  selector: 'app-admin-project-edit',
  templateUrl: './admin-project-edit.component.html',
  styleUrls: ['./admin-project-edit.component.css']
})
export class AdminProjectEditComponent implements OnInit {
  projectForm: FormGroup;
  projectId!: string | null;
  i!: number;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private projectsApiService: ProjectsApiService,
    private router: Router
  ) {
    this.projectForm = this.fb.group({
      projectName: ['', Validators.required],
      projectDescription: ['', Validators.required],
      projectType: ['', Validators.required],
      clientCountry: ['', Validators.required],
      clientIndustry: ['', Validators.required],
      clientLogo: ['', Validators.required],
      clientName: ['', Validators.required],
      projectDuration: [null, Validators.required],
      members: [null, Validators.required],
      clientRating: [null, Validators.required],
      features: this.fb.array([]),
      projectImage: ['', Validators.required],
      clientReview: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id');

    if (this.projectId) {
      this.loadProject(this.projectId);
    }
  }

  loadProject(id: string): void {
    this.projectsApiService.getById(id).subscribe((project: Projects) => {
      this.populateForm(project);
    }, error => {
      console.error('Error fetching project data:', error);
    });
  }

  populateForm(project: Projects): void {
    this.projectForm.patchValue({
      projectName: project.projectName,
      projectDescription: project.projectDescription,
      projectType: project.projectType,
      clientCountry: project.clientCountry,
      clientIndustry: project.clientIndustry,
      clientLogo: project.clientLogo,
      clientName: project.clientName,
      projectDuration: project.projectDuration,
      members: project.members,
      clientRating: project.clientRating,
      projectImage: project.projectImage,
      clientReview: project.clientReview
    });

    this.features.clear();
    project.features.forEach(feature => {
      this.features.push(this.fb.group({
        featureName: [feature.featureName, Validators.required]
      }));
    });
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

  updateProject(): void {
    if (this.projectForm.valid) {
      const updatedProject = this.projectForm.value;
      this.projectsApiService.put(this.projectId, updatedProject).subscribe(() => {
        this.router.navigate(["admin/projects"]);
      }, error => {
        console.error('Error updating project:', error);
      });
    }
  }
}
