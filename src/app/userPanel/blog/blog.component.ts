/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
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
  currentPage: number = 1;
  pageSize: number = 12;
  total: number = 0;
  fixed = Math.ceil(this.total / this.pageSize);
  showPagination: boolean = false;
  constructor(private api: BlogApiService, private meta: Meta, private sanitizer: DomSanitizer) {
    this.getBlogs();
  }
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.meta.addTags([
      { name: 'description', content: 'Explore expert insights and articles on the latest trends in web and mobile development at XpertCoder.' },
      { name: 'keywords', content: 'XpertCoder blog, web development blog, mobile development articles, technology insights ,' },
      { name: 'robots', content: 'index, follow' }
    ]);
  }
  getBlogs(): void {
    this.api.getBlogs(this.currentPage, this.pageSize).subscribe((data: any) => {
      this.blogs = data.data;
      this.total = data.count;
      this.fixed = Math.ceil(this.total / this.pageSize);
      this.showPagination = this.total > this.pageSize;

      console.log('Total blogs:', this.total);
      console.log('Pages needed:', this.fixed);
      console.log('Show pagination:', this.showPagination);
    });
  }


  sanitizeHtml(blogDescription: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(blogDescription);
  }
  pageChanged(event: number): void {
    this.currentPage = event;
    this.getBlogs();
    window.scrollTo(0, 0);
  }
}
