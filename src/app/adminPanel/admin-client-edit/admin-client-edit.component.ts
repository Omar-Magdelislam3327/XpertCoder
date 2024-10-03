import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsApiService } from 'src/app/services/clients-api.service';
import { Clients } from 'src/app/modules/clients';
@Component({
  selector: 'app-admin-client-edit',
  templateUrl: './admin-client-edit.component.html',
  styleUrls: ['./admin-client-edit.component.css']
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
    // Initialize form
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      logo: ['', Validators.required],
      review: ['', Validators.required]
    });

    this.clientId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.loadClientData();
  }

  loadClientData(): void {
    this.clientApi.getById(this.clientId).subscribe((client: Clients) => {
      console.log(client);
      this.clientForm.patchValue({
        name: client.name,
        title: client.title,
        review: client.review
      });
    }, error => {
      console.error('Error loading client data', error);
    });
  }

  update(): void {
    if (this.clientForm.valid) {
      this.clientApi.put(this.clientId, this.clientForm.value).subscribe(() => {
        this.router.navigate(['/admin/clients']);
      }, error => {
        console.error('Error updating client', error);
      });
    }
  }
}
