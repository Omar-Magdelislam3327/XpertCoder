import { Component } from '@angular/core';
import { BlogApiService } from 'src/app/services/blog-api.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
  blogs!: any;
  constructor(private api: BlogApiService) {
    this.api.get().subscribe((data: any) => {
      this.blogs = data;
    })
  }
}
