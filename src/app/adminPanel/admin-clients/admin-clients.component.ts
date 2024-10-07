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
      name: ['', Validators.required],
      title: ['', Validators.required],
      logo: ['', Validators.required],
      review: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadClients();
  }
  loadClients() {
    this.api.get().subscribe((data: Clients[]) => {
      this.clientForm.patchValue(data);
      this.clients = data;
    });
  }
  add(): void {
    if (this.clientForm.valid) {
      this.api.post(this.clientForm.value).subscribe(() => {
        this.clientForm.reset();
        this.loadClients();
      });
    }
  }
  remove(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00816F',
      cancelButtonColor: '#c4002b',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.delete(id).subscribe(() => {
          this.loadClients();
          Swal.fire(
            'Deleted!',
            'Your client has been deleted.',
            'success'
          );
        });
      }
    });
  }
}
