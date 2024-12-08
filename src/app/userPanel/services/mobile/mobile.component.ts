import { Component } from '@angular/core';
import { Projects } from 'src/app/modules/projects';
import { ProjectsApiService } from 'src/app/services/projects-api.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.css'],
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
export class MobileComponent {
  projects: any[] = [];

  constructor(private api: ProjectsApiService, private meta: Meta) {
    window.scrollTo(0, 0);
    this.api.getProjects().subscribe((data: any) => {
      this.projects = data.data.filter((project: Projects) => project.projectType === 'Mobile');
    }, error => {
      console.error('Error fetching projects', error);
    });
  }
  ngOnInit(): void {
    this.meta.addTags([
      { name: 'description', content: 'XpertCoder provides top-notch mobile app development services, creating engaging apps for iOS and Android platforms.' },
      { name: 'keywords', content: 'mobile app development, iOS app development, Android app development, XpertCoder' },
      { name: 'robots', content: 'index, follow' }
    ]);
  }
}
