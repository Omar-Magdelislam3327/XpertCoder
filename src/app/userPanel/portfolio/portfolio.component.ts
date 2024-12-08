/* eslint-disable @typescript-eslint/no-inferrable-types */
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
  currentPage: number = 1;
  pageSize: number = 12;
  total: number = 0;
  fixed = Math.ceil(this.total / this.pageSize);
  showPagination: boolean = false;
  constructor(private api: ProjectsApiService, private meta: Meta) {
    window.scrollTo(0, 0);
    this.getProjects();
  }
  ngOnInit(): void {
    this.meta.addTags([
      { name: 'description', content: 'Check out XpertCoder\'s portfolio showcasing successful web and mobile development projects across various industries.' },
      { name: 'keywords', content: 'XpertCoder portfolio, web development projects, mobile app development examples, case studies , ui/ux design , software testing' },
      { name: 'robots', content: 'index, follow' }
    ]);
  }
  getProjects() {
    this.api.getProjects(this.currentPage, this.pageSize).subscribe((data: any) => {
      this.projects = data.data;
      this.total = data.count;
      this.fixed = Math.ceil(this.total / this.pageSize);
      this.showPagination = this.total > this.pageSize;
      console.log(data);
    });
  }
  pageChanged(event: number): void {
    this.currentPage = event;
    this.getProjects();
    window.scrollTo(0, 0);
  }
}
