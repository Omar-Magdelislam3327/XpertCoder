/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { ProjectsApiService } from 'src/app/services/projects-api.service';
import { Component, HostListener } from '@angular/core';
import { ClientsApiService } from 'src/app/services/clients-api.service';
import { BlogApiService } from 'src/app/services/blog-api.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { Title, Meta } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { OpinionsService } from 'src/app/services/opinions.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
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
export class HomeComponent {
  clients!: any[];
  projects!: any[];
  webProjects!: any[];
  mobileProjects!: any[];
  uiProjects!: any[];
  testingProjects!: any[];
  allProjects!: any[];
  blogs!: any[];
  reviews!: any[];
  currentPage !: number;
  pageSize = 12;
  projectsCount!: number;
  clientsCount!: number;
  constructor(private api: ClientsApiService, private projectApi: ProjectsApiService, private blogApi: BlogApiService, private meta: Meta, private router: Router, private opinionsService: OpinionsService) {
    this.loadClients();

    this.projectApi.getProjects().subscribe((data: any) => {
      this.projects = data.data;
      this.projectsCount = data.count;
      this.webProjects = this.projects.filter(project => project.projectType === 'Web').slice(0, 3);
      this.mobileProjects = this.projects.filter(project => project.projectType === 'Mobile').slice(0, 3);
      this.uiProjects = this.projects.filter(project => project.projectType === 'ui/ux').slice(0, 3);
      this.testingProjects = this.projects.filter(project => project.projectType === 'SoftwareTesting').slice(0, 3);
      this.allProjects = this.projects.slice(0, 3);
    });

    this.blogApi.getBlogs(this.currentPage, this.pageSize).subscribe((data: any) => {
      this.blogs = data.data.slice(0, 3);
      console.log(this.blogs);

    });

    this.opinionsService.getOpinions().subscribe((data: any) => {
      this.reviews = data;
    });
  }


  // =================================================================
  hoveredCard: string = 'web';
  setHoveredCard(card: string) {
    if (card) {
      this.hoveredCard = card;
    }
  }
  //

  numVisible = 3;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.adjustCarousel();
  }

  ngOnInit() {
    this.adjustCarousel();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }
    });
    this.meta.addTags([
      { name: 'description', content: 'XperTCoder offers top-notch web and mobile development solutions.' },
      { name: 'keywords', content: 'XperTCoder, Integrated Solutions, Web Development, Mobile Development, UI/UX Design , Software Testing' },
      { name: 'robots', content: 'index, follow' }
    ]);

  }

  adjustCarousel() {
    const width = window.innerWidth;
    if (width < 576) {
      this.numVisible = 1;
    } else if (width < 768) {
      this.numVisible = 2;
    } else {
      this.numVisible = 3;
    }
  }
  loadClients() {
    this.api.getClients().subscribe({
      next: (data: any) => {
        this.clients = data.slice(0, 4);
        console.log('Clients:', this.clients);
        this.clients.forEach(client => {
          console.log('Client Name:', client.name);
          console.log('Client Image URL:', client.image);
        });
      },
      error: (error: any) => {
        console.error('Error fetching clients', error);
      }
    });
  }
  currentYear = new Date().getFullYear();
  year = this.currentYear - 2023;
}
