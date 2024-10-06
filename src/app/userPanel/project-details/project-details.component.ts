import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Projects, Feature } from 'src/app/modules/projects';
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
  allProjects = new Projects();
  relatedProjects: Projects[] = [];
  projectForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private projectsService: ProjectsApiService,
    private fb: FormBuilder,
    private meta: Meta,
    private titleService: Title
  ) {
    this.projectForm = this.fb.group({
      projectName: [''],
      projectDescription: [''],
      clientName: [''],
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getProjectDetails(this.id);
    this.meta.addTags([
      { name: 'description', content: 'Check out XpertCoder\'s portfolio showcasing successful web and mobile development projects across various industries.' },
      { name: 'keywords', content: 'XpertCoder portfolio, web development projects, mobile app development examples, case studies , ui/ux design , software testing' },
      { name: 'robots', content: 'index, follow' }
    ]);
  }

  getProjectDetails(id: string) {
    this.projectsService.getById(id).subscribe(data => {
      this.allProjects = data;
      this.titleService.setTitle(`XpertCoder Project  | ${this.allProjects.projectName}`);
      this.meta.updateTag({ name: 'description', content: this.allProjects.projectDescription });
      this.projectForm.patchValue({
        projectName: data.projectName,
        projectDescription: data.projectDescription,
        clientName: data.clientName,
      });
      this.getRelatedProjects(data.projectType);
    });
  }

  getRelatedProjects(type: string) {
    this.projectsService.get().subscribe(data => {
      this.relatedProjects = data.filter(project => project.projectType === type && project.id !== this.allProjects.id);
    });
  }

  submitForm() {
    if (this.projectForm.valid) {
      console.log(this.projectForm.value);
    }
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
