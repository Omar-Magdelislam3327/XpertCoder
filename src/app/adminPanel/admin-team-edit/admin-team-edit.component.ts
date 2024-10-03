import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from 'src/app/modules/team';
import { TeamApiService } from 'src/app/services/team-api.service';

@Component({
  selector: 'app-admin-team-edit',
  templateUrl: './admin-team-edit.component.html',
  styleUrls: ['./admin-team-edit.component.css']
})
export class AdminTeamEditComponent {
  id!: number;
  teamForm: FormGroup;
  team: Team = new Team();

  constructor(
    private api: TeamApiService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router // Inject Router to navigate
  ) {
    this.id = this.route.snapshot.params['id'];
    this.teamForm = this.fb.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      image: ['', Validators.required]
    });

    // Load member data
    this.api.getById(this.id).subscribe((data: Team) => {
      this.team = data;
      this.teamForm.patchValue(this.team); // Populate form with existing data
    });
  }

  update() {
    if (this.teamForm.valid) {
      this.api.put(this.teamForm.value, this.id).subscribe(() => {
        // Optionally redirect or show success message
        this.router.navigate(['/admin/team']); // Redirect after update
      });
    }
  }

  deleteMember() {
    this.api.delete(this.id).subscribe(() => {
      this.router.navigate(['/admin/team']); // Redirect to admin/team after deletion
    });
  }

  onImageChange(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.teamForm.patchValue({ image: e.target!.result }); // Set the image value
      };
      reader.readAsDataURL(file);
    }
  }
}
