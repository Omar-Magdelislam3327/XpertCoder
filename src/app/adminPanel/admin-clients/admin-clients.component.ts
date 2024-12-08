import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Clients } from 'src/app/modules/clients';
import { ClientsApiService } from 'src/app/services/clients-api.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-clients',
  templateUrl: './admin-clients.component.html',
  styleUrls: ['./admin-clients.component.css'],
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
export class AdminClientsComponent implements OnInit {
  clientForm: FormGroup;
  clients!: any;
  constructor(private api: ClientsApiService, private fb: FormBuilder) {
    this.clientForm = this.fb.group({
      Name: ['', Validators.required],
      Title: ['', Validators.required],
      Review: ['', Validators.required],
      Rating: ['', Validators.required],
      Image: ['', Validators.required],
      CountryId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadClients();
    this.getCountries()
  }
  loadClients() {
    this.api.getClients().subscribe((data: any) => {
      // this.clientForm.patchValue(data);
      this.clients = data;
    });
  }
  fileSize: number | null = null;
  readonly maxFileSizeInMB: number = 50;
  add(): void {
    if (this.clientForm.invalid || !this.selectedFile || this.invalidFileType || this.fileTooLarge) {
      console.log('Please complete the form or correct errors.');
      return;
    }

    const formData = new FormData();
    formData.append('Image', this.selectedFile);
    formData.append('Name', this.clientForm.get('Name')?.value || '');
    formData.append('Title', this.clientForm.get('Title')?.value || '');
    formData.append('Review', this.clientForm.get('Review')?.value || '');
    formData.append('Rating', this.clientForm.get('Rating')?.value || '');
    formData.append('CountryId', this.clientForm.get('CountryId')?.value || '');

    this.api.CreateClient(formData).subscribe(
      (response) => {
        this.loadClients();
        console.log('Client added successfully:', response);
        this.clientForm.reset();
        this.selectedFile = null;
      },
      (error) => {
        console.log('Error adding client:', error);
      }
    );
  }

  selectedFile: File | null = null;
  fileTooLarge = false;
  invalidFileType = false;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      const maxSize = 5 * 1024 * 1024;

      if (!validTypes.includes(file.type)) {
        this.invalidFileType = true;
        console.log('Invalid file type');
        return;
      }

      if (file.size > maxSize) {
        this.fileTooLarge = true;
        console.log('File too large');
        return;
      }

      this.invalidFileType = false;
      this.fileTooLarge = false;
      this.selectedFile = file;
    }
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
        this.api.DeleteClient(id).subscribe(
          () => {
            this.loadClients();
          },
          (error) => {
            Swal.fire({
              title: 'Error!',
              text: 'There was an issue deleting the client.',
              icon: 'error',
              confirmButtonText: 'Retry',
              confirmButtonColor: '#00816F'
            })
          }
        );
      }
    });
  }
  countries!: any[]
  getCountries() {
    this.api.getCountries().subscribe((data: any) => {
      this.countries = data;
    });
  }
}
