import { Component } from '@angular/core';
import { Blogs } from 'src/app/modules/blogs';
import { BlogsApiService } from 'src/app/services/blogs-api.service';

@Component({
  selector: 'app-admin-blogs',
  templateUrl: './admin-blogs.component.html',
  styleUrls: ['./admin-blogs.component.css']
})
export class AdminBlogsComponent {
  blog = new Blogs();
  constructor(private blogApi: BlogsApiService) {
    this.blogApi.get().subscribe((data: any) => {
      this.blog = data;
    })
  }
  add() {
    this.blogApi.post(this.blog).subscribe((data: any) => {
      location.reload();
    })
  }
}
