import { Component } from '@angular/core';
import { Projects } from 'src/app/modules/projects';
import { ProjectsApiService } from 'src/app/services/projects-api.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-soft-testing',
  templateUrl: './soft-testing.component.html',
  styleUrls: ['./soft-testing.component.css'],
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
export class SoftTestingComponent {
  projects: any[] = [];

  constructor(private api: ProjectsApiService, private meta: Meta) {
    window.scrollTo(0, 0);
    this.api.get().subscribe((data: any) => {
      this.projects = data.filter((project: Projects) => project.projectType === 'Software Testing');
    }, error => {
      console.error('Error fetching projects', error);
    });
  }
  ngOnInit(): void {
    this.meta.addTags([
      { name: 'description', content: 'XpertCoder specializes in crafting intuitive and beautiful UI/UX designs that enhance user experience and engagement.' },
      { name: 'keywords', content: 'UI/UX design services, user interface design, user experience, XpertCoder design' },
      { name: 'robots', content: 'index, follow' }
    ]);
  }
}
