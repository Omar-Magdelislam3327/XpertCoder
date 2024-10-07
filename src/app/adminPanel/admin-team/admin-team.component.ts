import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeamApiService } from 'src/app/services/team-api.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import Swal from 'sweetalert2';

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
  team!: any
  constructor(private api: TeamApiService, private fb: FormBuilder) {
    this.teamForm = this.fb.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      image: ['', Validators.required]
    })
    this.loadTeam();
  }
  loadTeam() {
    this.api.get().subscribe({
      next: (data) => {
        this.team = data;
      },
      error: (error) => {
        console.log(error);
      },
    })
  }
  add() {
    if (this.teamForm.valid) {
      this.api.post(this.teamForm.value).subscribe({
        next: () => {
          this.loadTeam()
        },
        error: (error) => {
          console.log(error);
        }
      })
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
          this.loadTeam();
          Swal.fire(
            'Deleted!',
            'Your blog has been deleted.',
            'success'
          );
        });
      }
    });
  }
}
