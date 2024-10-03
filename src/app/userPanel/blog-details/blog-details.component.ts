import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blogs } from 'src/app/modules/blogs';
import { BlogApiService } from 'src/app/services/blog-api.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent {
  id!: any;
  blog = new Blogs();
  constructor(private api: BlogApiService, private activ: ActivatedRoute) {
    this.id = this.activ.snapshot.params['id'];
    this.api.getById(this.id).subscribe(data => {
      this.blog = data;
    });
  }
}
