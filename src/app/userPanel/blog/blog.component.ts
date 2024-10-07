import { Component } from '@angular/core';
import { BlogApiService } from 'src/app/services/blog-api.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { DomSanitizer, Meta, SafeHtml } from '@angular/platform-browser';

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
  constructor(private api: BlogApiService, private meta: Meta, private sanitizer: DomSanitizer) {
    this.api.get().subscribe((data: any) => {
      this.blogs = data;
    })
  }
  ngOnInit(): void {
    this.meta.addTags([
      { name: 'description', content: 'Explore expert insights and articles on the latest trends in web and mobile development at XpertCoder.' },
      { name: 'keywords', content: 'XpertCoder blog, web development blog, mobile development articles, technology insights ,' },
      { name: 'robots', content: 'index, follow' }
    ]);
  }
  sanitizeHtml(blogDescription: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(blogDescription);
  }
}
