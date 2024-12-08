/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Projects } from 'src/app/modules/projects';
import { ProjectsApiService } from 'src/app/services/projects-api.service';
import { ClientsApiService } from 'src/app/services/clients-api.service';
import { trigger, transition, style, animate } from '@angular/animations';
import Swal from 'sweetalert2';

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
  projects: any[] = [];
  clients: any[] = [];
  i!: any;
  constructor(
    private fb: FormBuilder,
    private api: ProjectsApiService,
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
    this.fetchClients();
    this.fetchProjects();
  }



  fetchClients(): void {
    this.clientApi.getClients().subscribe((data: any) => {
      this.clients = data;
    });
  }


  add(): void {
    if (this.projectForm.invalid) {
      return;
    }

    const formData = new FormData();

    const imageFile = this.projectForm.get('Image')?.value;
    if (imageFile) {
      const fileType = imageFile.type;
      const maxFileSize = 5 * 1024 * 1024;

      if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
        alert('Invalid file type. Please select a JPEG or PNG image.');
        return;
      }

      if (imageFile.size > maxFileSize) {
        alert('File is too large. Please select a file smaller than 5MB.');
        return;
      }

      formData.append('Image', imageFile);
    } else {
      alert('Please select a project image');
      return;
    }

    formData.append('projectName', this.projectForm.get('ProjectName')?.value || '');
    formData.append('projectDescription', this.projectForm.get('ProjectDescription')?.value || '');
    formData.append('projectType', this.projectForm.get('ProjectType')?.value || '');
    formData.append('clientId', this.projectForm.get('CLientId')?.value || '');
    formData.append('ClientIndustry', this.projectForm.get('ClientIndustry')?.value || '');
    formData.append('Duration', this.projectForm.get('Duration')?.value || '');
    formData.append('Members', this.projectForm.get('Members')?.value || '');
    formData.append('Features', this.projectForm.get('Features')?.value || '');


    console.log("Final FormData", formData);

    this.api.addProject(formData).subscribe(
      (response: any) => {
        console.log('Project added successfully', response);
        this.projectForm.reset();
        this.fetchProjects();
        Swal.fire({
          title: 'Project added successfully!',
          icon: 'success',
          confirmButtonText: 'Okay',
          confirmButtonColor: "#00816F"
        })
      },
      (error: any) => {
        console.error('Error adding project:', error);
        Swal.fire({
          title: 'Error adding project!',
          icon: 'error',
          confirmButtonText: 'Retry',
          confirmButtonColor: "#00816F"
        })
      }
    );
  }

  fetchProjects(): void {
    this.api.getProjects().subscribe((data: any) => {
      this.projects = data.data;
      console.log(this.projects);
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
        this.api.deleteProject(id).subscribe(
          () => {
            this.fetchProjects();
          },
          (error: any) => {
            Swal.fire({
              title: 'Error!',
              text: 'There was an issue deleting the blog.',
              icon: 'error',
              confirmButtonText: 'Retry',
              confirmButtonColor: "#00816F"
            })
          }
        );
      }
    });
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.projectForm.patchValue({
        Image: input.files[0]
      });
    }
  }

}
