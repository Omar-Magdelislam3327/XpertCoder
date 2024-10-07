import { Component } from '@angular/core';
import { Projects } from 'src/app/modules/projects';
import { ProjectsApiService } from 'src/app/services/projects-api.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-web',
  templateUrl: './web.component.html',
  styleUrls: ['./web.component.css'],
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
export class WebComponent {
  projects: any[] = [];

  constructor(private api: ProjectsApiService, private meta: Meta) {
    window.scrollTo(0, 0);
    this.api.get().subscribe((data: any) => {
      this.projects = data.filter((project: Projects) => project.projectType === 'Web Development');
    }, error => {
      console.error('Error fetching projects', error);
    });
  }
  ngOnInit(): void {
    this.meta.addTags([
      { name: 'description', content: 'XpertCoder offers high-quality web development services, creating responsive, user-friendly websites for your business.' },
      { name: 'keywords', content: 'web development services, responsive websites, custom web development, XpertCoder , js , angular , react , node js , laravel , php , wordpress , .net core' },
      { name: 'robots', content: 'index, follow' }
    ]);
  }
}
