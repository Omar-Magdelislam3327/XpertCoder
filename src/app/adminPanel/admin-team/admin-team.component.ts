import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeamApiService } from 'src/app/services/team-api.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

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
          this.api.get().subscribe((data) => {
            this.teamForm.reset();
            this.team = data;

          })
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }
  remove(id: any) {
    this.api.delete(id).subscribe({
      next: () => {
        this.api.get().subscribe((data) => {
          this.team = data;
        })
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
