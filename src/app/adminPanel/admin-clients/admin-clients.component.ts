import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Clients } from 'src/app/modules/clients';
import { ClientsApiService } from 'src/app/services/clients-api.service';

@Component({
  selector: 'app-admin-clients',
  templateUrl: './admin-clients.component.html',
  styleUrls: ['./admin-clients.component.css']
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
    this.api.get().subscribe((data: Clients) => {
      this.clientForm.patchValue(data);
      this.clients = data;
    });
  }

  add(): void {
    if (this.clientForm.valid) {
      this.api.post(this.clientForm.value).subscribe(() => {
        this.clientForm.reset();
      });
    }
  }
}
