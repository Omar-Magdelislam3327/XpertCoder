import { Component } from '@angular/core';
import { BlogsApiService } from 'src/app/services/blogs-api.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
  blogs!: any;
  constructor(private api: BlogsApiService) {
    this.api.get().subscribe((data: any) => {
      this.blogs = data;
    })
  }
}
