import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blogs } from 'src/app/modules/blogs';
import { BlogApiService } from 'src/app/services/blog-api.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css'],
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
export class BlogDetailsComponent implements OnInit {
  id!: string;
  blog!: Blogs;
  relatedBlogs: Blogs[] = [];

  constructor(private api: BlogApiService, private activ: ActivatedRoute, private meta: Meta, private titleService: Title) { }

  ngOnInit() {
    this.activ.params.subscribe((params) => {
      this.id = params['id'];
      this.fetchBlogDetails(this.id);
    });
    this.meta.addTags([
      { name: 'description', content: 'Explore expert insights and articles on the latest trends in web and mobile development at XpertCoder.' },
      { name: 'keywords', content: 'XpertCoder blog, web development blog, mobile development articles, technology insights , software testing' },
      { name: 'robots', content: 'index, follow' }
    ]);
  }

  fetchBlogDetails(id: string) {
    this.api.getById(id).subscribe((data: Blogs) => {
      this.blog = data;
      this.titleService.setTitle(`XpertCoder Blog | ${this.blog.title}`);
      this.meta.updateTag({ name: 'description', content: this.blog.description });
      this.api.get().subscribe((blogs: Blogs[]) => {
        this.relatedBlogs = blogs.filter(b => b.type === this.blog.type && b.id !== this.blog.id);
      });
    });
  }
}
