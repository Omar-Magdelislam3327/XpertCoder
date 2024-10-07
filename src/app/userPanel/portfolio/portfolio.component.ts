import { Component } from '@angular/core';
import { ProjectsApiService } from 'src/app/services/projects-api.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
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
export class PortfolioComponent {
  projects!: any;
  constructor(private api: ProjectsApiService, private meta: Meta) {
    window.scrollTo(0, 0);
    this.api.get().subscribe((data: any) => {
      this.projects = data;
    });
  }
  ngOnInit(): void {
    this.meta.addTags([
      { name: 'description', content: 'Check out XpertCoder\'s portfolio showcasing successful web and mobile development projects across various industries.' },
      { name: 'keywords', content: 'XpertCoder portfolio, web development projects, mobile app development examples, case studies , ui/ux design , software testing' },
      { name: 'robots', content: 'index, follow' }
    ]);
  }
}
