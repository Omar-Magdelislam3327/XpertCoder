import { Component } from '@angular/core';
import { Projects } from 'src/app/modules/projects';
import { ProjectsApiService } from 'src/app/services/projects-api.service';

@Component({
  selector: 'app-web',
  templateUrl: './web.component.html',
  styleUrls: ['./web.component.css']
})
export class WebComponent {
  projects: any[] = [];

  constructor(private api: ProjectsApiService) {
    this.api.get().subscribe((data: any) => {
      this.projects = data.filter((project: Projects) => project.projectType === 'Web Development');
    }, error => {
      console.error('Error fetching projects', error);
    });
  }
}
