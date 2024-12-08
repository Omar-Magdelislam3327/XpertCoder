/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { trigger, transition, style, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OpinionsService } from 'src/app/services/opinions.service';

@Component({
  selector: 'app-admin-opinions-edit',
  templateUrl: './admin-opinions-edit.component.html',
  styleUrls: ['./admin-opinions-edit.component.css'],
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
export class AdminOpinionsEditComponent {
  opinionForm!: FormGroup;
  opinionId!: number;
  constructor(private api: OpinionsService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
    this.opinionForm = this.fb.group({
      Name: ['', Validators.required],
      Title: ['', Validators.required],
      Description: ['', Validators.required],
      Image: ['', Validators.required],
    });
    this.opinionId = +this.route.snapshot.paramMap.get('id')!;
  }


  loadClientData(): void {
    this.api.getOpinionById(this.opinionId).subscribe((client: any) => {
      console.log(client);
      this.opinionForm.patchValue({
        Name: client.name,
        Title: client.title,
        Description: client.description,
        Image: client.image,
      });
    }, error => {
      console.error('Error loading client data', error);
    });
  }
  update(): void {
    if (this.opinionForm.valid) {
      this.api.updateOpinion(this.opinionId, this.opinionForm.value).subscribe(() => {
        this.router.navigate(['/admin/opinios']);
      }, error => {
        console.error('Error updating client', error);
      });
    }
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
}
