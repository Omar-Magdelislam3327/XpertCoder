import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogDetailsComponent } from './blog-details.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", component: BlogDetailsComponent }
    ])
  ]
})
export class BlogDetailsModule { }
