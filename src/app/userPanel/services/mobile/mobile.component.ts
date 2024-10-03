import { Component } from '@angular/core';
import { Projects } from 'src/app/modules/projects';
import { ProjectsApiService } from 'src/app/services/projects-api.service';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.css']
})
export class MobileComponent {
  projects: any[] = [];

  constructor(private api: ProjectsApiService) {
    this.api.get().subscribe((data: any) => {
      this.projects = data.filter((project: Projects) => project.projectType === 'Mobile Development');
    }, error => {
      console.error('Error fetching projects', error);
    });
  }
}
