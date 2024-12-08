/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsApiService } from 'src/app/services/clients-api.service';
import { Clients } from 'src/app/modules/clients';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-client-edit',
  templateUrl: './admin-client-edit.component.html',
  styleUrls: ['./admin-client-edit.component.css'],
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
export class AdminClientEditComponent implements OnInit {
  clientForm: FormGroup;
  clientId: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private clientApi: ClientsApiService
  ) {
    this.clientForm = this.fb.group({
      Name: ['', Validators.required],
      Title: ['', Validators.required],
      Review: ['', Validators.required],
      Rating: ['', Validators.required],
      Image: ['', Validators.required],
    });

    this.clientId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.loadClientData();
    this.getCountries();
  }

  loadClientData(): void {
    this.clientApi.getClientById(this.clientId).subscribe((client: any) => {
      console.log(client);
      this.clientForm.patchValue({
        Name: client.name,
        Title: client.title,
        Review: client.review,
        Rating: client.rating,
        Image: client.image,
      });
    }, error => {
      console.error('Error loading client data', error);
    });
  }

  update(): void {
    if (this.clientForm.invalid) {
      console.log("Form is invalid");
      return;
    }

    const formData = new FormData();

    if (this.selectedFile) {
      formData.append('Image', this.selectedFile);
      console.log('Image appended:', this.selectedFile);
    }

    formData.append('Name', this.clientForm.get('Name')?.value || '');
    formData.append('Title', this.clientForm.get('Title')?.value || '');
    formData.append('Review', this.clientForm.get('Review')?.value || '');
    formData.append('Rating', this.clientForm.get('Rating')?.value || '');

    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    this.clientApi.UpdateClient(this.clientId, formData).subscribe(
      () => {
        this.router.navigate(['/admin/clients']);
      },
      (error) => {
        console.error('Failed to update client:', error);
      }
    );
  }
  countries!: any[];
  getCountries() {
    this.clientApi.getCountries().subscribe((data: any) => {
      this.countries = data;
    });
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
}
