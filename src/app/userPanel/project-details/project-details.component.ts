import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Projects } from 'src/app/modules/projects';
import { ProjectsApiService } from 'src/app/services/projects-api.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  id: any;
  allProjects = new Projects();
  projectForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private projectsService: ProjectsApiService,
    private fb: FormBuilder
  ) {
    this.projectForm = this.fb.group({
      projectName: [''],
      projectDescription: [''],
      clientName: [''],
      // Add other necessary form controls here
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getProjectDetails(this.id);
  }

  getProjectDetails(id: string) {
    this.projectsService.getById(id).subscribe(data => {
      this.allProjects = data;
      // Set form values after fetching project details
      this.projectForm.patchValue({
        projectName: data.projectName,
        projectDescription: data.projectDescription,
        clientName: data.clientName,
        // Add other fields here
      });
    });
  }

  submitForm() {
    if (this.projectForm.valid) {
      console.log(this.projectForm.value);
      // Process form submission
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
