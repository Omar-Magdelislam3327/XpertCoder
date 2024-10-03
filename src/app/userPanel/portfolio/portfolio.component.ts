import { Component } from '@angular/core';
import { ProjectsApiService } from 'src/app/services/projects-api.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent {
  projects!: any;
  constructor(private api: ProjectsApiService) {
    this.api.get().subscribe((data: any) => {
      this.projects = data;
    });
  }
}
