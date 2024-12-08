/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from 'src/app/modules/team';
import { TeamApiService } from 'src/app/services/team-api.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-admin-team-edit',
  templateUrl: './admin-team-edit.component.html',
  styleUrls: ['./admin-team-edit.component.css'],
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
export class AdminTeamEditComponent {
  id!: any;
  teamForm: FormGroup;
  team: Team = new Team();

  constructor(
    private api: TeamApiService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id = this.route.snapshot.params['id'];
    this.teamForm = this.fb.group({
      memberName: ['', Validators.required],
      memberTitle: ['', Validators.required],
      imageUrl: ['', Validators.required]
    });

    this.api.getTeamById(this.id).subscribe((data: Team) => {
      this.team = data;
      this.teamForm.patchValue(this.team);
      console.log(data);

    });
  }

  selectedFile!: any;
  fileSize: number | null = null;
  fileTooLarge: boolean = false;
  invalidFileType: boolean = false;
  readonly maxFileSizeInMB: number = 50;
  update(): void {
    if (this.teamForm.invalid) {
      console.log("Form is invalid");
      return;
    }

    const formData = new FormData();

    if (this.selectedFile) {
      formData.append('imageUrl', this.selectedFile);
      console.log('imageUrl appended:', this.selectedFile);
    }

    formData.append('memberName', this.teamForm.get('memberName')?.value || '');
    formData.append('memberTitle', this.teamForm.get('memberTitle')?.value || '');

    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    this.api.updateTeam(this.id, formData).subscribe(
      () => {
        this.router.navigate(['/admin/team']);
      },
      (error) => {
        console.error('Failed to update blog:', error);
      }
    );
  }


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
