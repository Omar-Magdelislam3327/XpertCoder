import { ProjectsApiService } from 'src/app/services/projects-api.service';
import { Component, HostListener } from '@angular/core';
import { ClientsApiService } from 'src/app/services/clients-api.service';
import { BlogApiService } from 'src/app/services/blog-api.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { Title, Meta } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import * as AOS from 'aos';

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
  clients!: any;
  projects!: any[];
  webProjects!: any[];
  mobileProjects!: any[];
  uiProjects!: any[];
  testingProjects!: any[];
  allProjects!: any[];
  blogs!: any;
  constructor(private api: ClientsApiService, private projectApi: ProjectsApiService, private blogApi: BlogApiService, private meta: Meta, private router: Router) {
    this.api.get().subscribe((data: any) => {
      this.clients = data;
    });

    this.projectApi.get().subscribe((data: any) => {
      this.projects = data;
      this.webProjects = this.projects.filter(project => project.projectType === 'Web Development').slice(0, 3);
      this.mobileProjects = this.projects.filter(project => project.projectType === 'Mobile Development').slice(0, 3);
      this.uiProjects = this.projects.filter(project => project.projectType === 'ui/ux').slice(0, 3);
      this.testingProjects = this.projects.filter(project => project.projectType === 'Software Testing').slice(0, 3);
      this.allProjects = this.projects.slice(0, 3);
    });

    this.blogApi.get().subscribe((data: any) => {
      this.blogs = data;
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
  reviews = [
    {
      title: 'Great Work',
      text: 'Lorem ipsum dolor sit amet consectetur. Eu a et ultricies sed volutpat in. Hendrerit eget nulla purus volutpat eu enim. In lectus convallis tortor facilisis malesuada lobortis gravida diam',
      img: 'https://media.gettyimages.com/id/1332113666/photo/young-businesswoman-using-digital-tablet.jpg?s=612x612&w=gi&k=20&c=jBVr_LzGgIjvmyF6pmgXBqfSZkzmpNWUHxv-zKgw8pQ=',
      name: 'Sara Magdy',
      job: 'CEO at the University of MUST'
    },
    {
      title: 'Amazing',
      text: 'Lorem ipsum dolor sit amet consectetur. Eu a et ultricies sed volutpat in. Hendrerit eget nulla purus volutpat eu enim. In lectus convallis tortor facilisis malesuada lobortis gravida diam',
      img: 'assets/vendors/imgs/anba.jpg'
      , name: 'Mohamed Ahmed', job: 'CEO at the University of MUST'
    },
    { title: 'Good Job', text: 'Lorem ipsum dolor sit amet consectetur. Eu a et ultricies sed volutpat in. Hendrerit eget nulla purus volutpat eu enim. In lectus convallis tortor facilisis malesuada lobortis gravida diam', img: 'assets/vendors/imgs/ahmed.png', name: 'Ahmed Magdy', job: 'CEO at the University of MUST' },
    { title: 'Amazing', text: 'Lorem ipsum dolor sit amet consectetur. Eu a et ultricies sed volutpat in. Hendrerit eget nulla purus volutpat eu enim. In lectus convallis tortor facilisis malesuada lobortis gravida diam', img: 'assets/vendors/imgs/mohamed.png', name: 'Mohamed Ahmed', job: 'CEO at the University of MUST' },
    { title: 'Good Job', text: 'Lorem ipsum dolor sit amet consectetur. Eu a et ultricies sed volutpat in. Hendrerit eget nulla purus volutpat eu enim. In lectus convallis tortor facilisis malesuada lobortis gravida diam', img: 'assets/vendors/imgs/ahmed.png', name: 'Ahmed Magdy', job: 'CEO at the University of MUST' },
    { title: 'Amazing', text: 'Lorem ipsum dolor sit amet consectetur. Eu a et ultricies sed volutpat in. Hendrerit eget nulla purus volutpat eu enim. In lectus convallis tortor facilisis malesuada lobortis gravida diam', img: 'assets/vendors/imgs/mohamed.png', name: 'Mohamed Ahmed', job: 'CEO at the University of MUST' },
    { title: 'Good Job', text: 'Lorem ipsum dolor sit amet consectetur. Eu a et ultricies sed volutpat in. Hendrerit eget nulla purus volutpat eu enim. In lectus convallis tortor facilisis malesuada lobortis gravida diam', img: 'assets/vendors/imgs/ahmed.png', name: 'Ahmed Magdy', job: 'CEO at the University of MUST' }
  ];
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
      AOS.init({
      });
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

}
