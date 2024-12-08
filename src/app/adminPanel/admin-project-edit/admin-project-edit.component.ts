/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsApiService } from 'src/app/services/projects-api.service';
import { Projects, Feature } from 'src/app/modules/projects';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { ClientsApiService } from 'src/app/services/clients-api.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-admin-project-edit',
  templateUrl: './admin-project-edit.component.html',
  styleUrls: ['./admin-project-edit.component.css'],
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
export class AdminProjectEditComponent implements OnInit {
  projectForm: FormGroup;
  projectId!: any | null;
  i!: number;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private projectsApiService: ProjectsApiService,
    private router: Router,
    private clientApi: ClientsApiService
  ) {
    this.projectForm = this.fb.group({
      ProjectName: ['', Validators.required],
      ProjectDescription: ['', Validators.required],
      ProjectType: ['', Validators.required],
      CLientId: ['', Validators.required],
      ClientIndustry: ['', Validators.required],
      Duration: ['', Validators.required],
      Members: ['', Validators.required],
      Features: ['', Validators.required],
      Image: [null, Validators.required],
    });
  }


  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id');

    if (this.projectId) {
      this.loadProject(this.projectId);
    }
    this.fetchClients()
  }

  loadProject(id: number): void {
    this.projectsApiService.getProjectById(id).subscribe(
      (project: any) => {
        console.log('Loaded Project data:', project);
        console.log("Project Features:", project.features);

        if (project) {
          this.projectForm.patchValue({
            ProjectName: project.projectName,
            ProjectDescription: project.projectDescription,
            ProjectType: project.projectType,
            CLientId: project.cLient.id,
            ClientIndustry: project.clientIndustry,
            Duration: project.duration,
            Members: project.members,
            Image: project.image,
            Features: project.features,
          });
        }
        this.projectForm.get('Features')!.setValue(project.features || '');
      },
      (error: any) => {
        console.error('Failed to load Project:', error);
      }
    );
  }


  update(): void {
    if (this.projectForm.invalid) {
      console.log("Form is invalid");
      return;
    }

    const formData = new FormData();

    if (this.selectedFile) {
      formData.append('Image', this.selectedFile);
      console.log('Image appended:', this.selectedFile);
    }
    formData.append('ProjectName', this.projectForm.get('ProjectName')?.value || '');
    formData.append('ProjectDescription', this.projectForm.get('ProjectDescription')?.value || '');
    formData.append('ProjectType', this.projectForm.get('ProjectType')?.value || '');
    formData.append('CLientId', this.projectForm.get('CLientId')?.value || '');
    formData.append('ClientIndustry', this.projectForm.get('ClientIndustry')?.value || '');
    formData.append('Members', this.projectForm.get('Members')?.value || '');
    formData.append('Duration', this.projectForm.get('Duration')?.value || '');
    formData.append('Features', this.projectForm.get('Features')?.value || '');

    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    this.projectsApiService.updateProject(this.projectId, formData).subscribe(
      () => {
        this.router.navigate(['/admin/projects']);
      },
      (error: any) => {
        console.error('Failed to update project:', error);
      }
    );
  }
  selectedFile!: any;
  fileSize: number | null = null;
  fileTooLarge: boolean = false;
  invalidFileType: boolean = false;
  readonly maxFileSizeInMB: number = 50;
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log('File selected:', this.selectedFile);
    }

    if (this.selectedFile) {
      const file = this.selectedFile;
      this.fileSize = file.size / (1024 * 1024);
      if (this.fileSize > this.maxFileSizeInMB) {
        this.fileTooLarge = true;
        this.invalidFileType = false;
        console.log("File size is too large to be uploaded");
        return;
      } else {
        this.fileTooLarge = false;
      }
      if (!file.type.startsWith('image/')) {
        this.invalidFileType = true;
        console.log("Invalid file type");
        return;
      } else {
        this.invalidFileType = false;
      }
    }
  }

  clients!: any[];
  fetchClients(): void {
    this.clientApi.getClients().subscribe((data: any) => {
      this.clients = data;
    });
  }
}
