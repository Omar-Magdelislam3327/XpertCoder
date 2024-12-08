import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeamApiService } from 'src/app/services/team-api.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import Swal from 'sweetalert2';
import { Team } from 'src/app/modules/team';

@Component({
  selector: 'app-admin-team',
  templateUrl: './admin-team.component.html',
  styleUrls: ['./admin-team.component.css'],
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
export class AdminTeamComponent {
  teamForm: FormGroup;
  team!: any;
  fileSize: number | null = null;
  fileTooLarge = false;
  invalidFileType = false;
  readonly maxFileSizeInMB: number = 50;
  selectedFile: File | null = null;
  constructor(private api: TeamApiService, private fb: FormBuilder) {
    this.teamForm = this.fb.group({
      memberName: ['', Validators.required],
      memberTitle: ['', Validators.required],
      imageUrl: ['', Validators.required]
    })
    this.loadTeam();
  }
  loadTeam() {
    this.api.getTeams().subscribe({
      next: (data) => {
        this.team = data;
        console.log(data);

      },
      error: (error) => {
        console.log(error);
      },
    })
  }
  add(): void {
    if (this.teamForm.invalid) {
      console.log("Please enter");

      return;
    }

    const formData = new FormData();

    if (this.selectedFile) {
      formData.append('imageUrl', this.selectedFile);
    } else {
      console.log("Please select");

      return;
    }

    formData.append('memberName', this.teamForm.get('memberName')?.value || '');
    formData.append('memberTitle', this.teamForm.get('memberTitle')?.value || '');

    if (this.invalidFileType || this.fileTooLarge) {
      console.log('Please select a valid image file (max size 50MB)');
      return;
    }


    this.api.addTeam(formData).subscribe(
      (response) => {
        this.loadTeam();
        console.log(response);

      },
      (error) => {
        console.log(error);
        alert('Error sending team');
      }
    );
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }

    if (input?.files?.length) {
      const file = input.files[0];
      this.fileSize = file.size / (1024 * 1024);
      if (this.fileSize > this.maxFileSizeInMB) {
        this.fileTooLarge = true;
        this.invalidFileType = false;
        return;
      } else {
        this.fileTooLarge = false;
      }
      if (!file.type.startsWith('image/')) {
        this.invalidFileType = true;
        return;
      } else {
        this.invalidFileType = false;
      }
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
        this.api.deleteTeam(id).subscribe(() => {
          this.loadTeam();

        }
        );
      }
    });
  }
}
