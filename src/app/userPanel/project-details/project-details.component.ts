import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ProjectsApiService } from 'src/app/services/projects-api.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
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
export class ProjectDetailsComponent implements OnInit {
  id: any;
  allProjects: any;
  relatedProjects: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private projectsService: ProjectsApiService,
    private meta: Meta,
    private titleService: Title,
    private router: Router
  ) {
    window.scrollTo(0, 0);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.getProjectDetails(this.id);
    });

    this.meta.addTags([
      { name: 'description', content: 'XpertCoder portfolio showcasing successful web and mobile development projects.' },
      { name: 'keywords', content: 'web development, mobile app development, portfolio, case studies, ui/ux design' },
      { name: 'robots', content: 'index, follow' }
    ]);
  }

  getProjectDetails(id: any) {
    this.projectsService.getProjectById(id).subscribe((data: any) => {
      this.allProjects = data;
      this.titleService.setTitle(`XpertCoder Project | ${this.allProjects.projectName}`);
      this.meta.updateTag({ name: 'description', content: this.allProjects.projectDescription });
      this.getRelatedProjects(this.allProjects.projectType);
    });
  }

  getRelatedProjects(type: string) {
    this.projectsService.getProjects().subscribe((data: any) => {
      this.relatedProjects = data.data.filter((project: any) => project.projectType === type && project.id !== this.allProjects.id);
    });
  }

  navigateToRelatedProject(id: string) {
    this.router.navigate([`/project/${id}`]);
    window.scrollTo(0, 0);
  }
  onMouseMove(event: MouseEvent) {
    const card = event.currentTarget as HTMLElement;
    const cardRect = card.getBoundingClientRect();
    const mouseX = event.clientX - cardRect.left;
    const mouseY = event.clientY - cardRect.top;
    const rotateX = (mouseY / cardRect.height - 0.5) * 20;
    const rotateY = (mouseX / cardRect.width - 0.5) * -20;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }

  onMouseLeave() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
      const element = card as HTMLElement;
      element.style.transform = `rotateX(0deg) rotateY(0deg)`;
    });
  }
}
