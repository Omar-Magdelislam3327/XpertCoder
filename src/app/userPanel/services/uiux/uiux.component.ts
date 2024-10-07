import { Component } from '@angular/core';
import { Projects } from 'src/app/modules/projects';
import { ProjectsApiService } from 'src/app/services/projects-api.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-uiux',
  templateUrl: './uiux.component.html',
  styleUrls: ['./uiux.component.css'],
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
export class UiuxComponent {
  projects: any[] = [];

  constructor(private api: ProjectsApiService, private meta: Meta) {
    window.scrollTo(0, 0);
    this.api.get().subscribe((data: any) => {
      this.projects = data.filter((project: Projects) => project.projectType === 'UI/UX');
    }, error => {
      console.error('Error fetching projects', error);
    });
  }
  ngOnInit(): void {
    this.meta.addTags([
      { name: 'description', content: 'Ensure the quality of your software with XpertCoder\'s reliable software testing services, including manual and automated testing.' },
      { name: 'keywords', content: 'software testing services, manual testing, automated testing, QA services, XpertCoder' },
      { name: 'robots', content: 'index, follow' }
    ]);
  }
}
