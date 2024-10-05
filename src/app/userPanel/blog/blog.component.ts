import { Component } from '@angular/core';
import { BlogApiService } from 'src/app/services/blog-api.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
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
export class BlogComponent {
  blogs!: any;
  constructor(private api: BlogApiService) {
    this.api.get().subscribe((data: any) => {
      this.blogs = data;
    })
  }
}
