import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Projects } from 'src/app/modules/projects';
import { ProjectsApiService } from 'src/app/services/projects-api.service';

@Component({
  selector: 'app-admin-projects',
  templateUrl: './admin-projects.component.html',
  styleUrls: ['./admin-projects.component.css']
})
export class AdminProjectsComponent {
  id: any;
  allProjects: Projects = new Projects();

  constructor(private api: ProjectsApiService, private activ: ActivatedRoute) {
    this.id = this.activ.snapshot.params['id'];
    this.allProjects.features = [];
  }

  addFeature() {
    this.allProjects.features.push('');
    console.log('Features after adding:', this.allProjects.features);
  }

  updateFeature(event: Event, index: number) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    if (value.length <= 1) {
      this.allProjects.features[index] = value;
    } else {
      this.allProjects.features[index] = value.charAt(0);
    }
  }

  removeFeature(index: number) {
    this.allProjects.features.splice(index, 1);
    console.log('Features after remove:', this.allProjects.features);
  }

  add() {
    this.api.post(this.allProjects).subscribe(
      (data: any) => {
        this.allProjects = data;
        console.log("Project added successfully", this.allProjects);
        location.reload();
      }
    );
  }
}
