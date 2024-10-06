import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { JoinComponent } from '../join/join.component';
import { BlogComponent } from './blog.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", component: BlogComponent }
    ])
  ]
})
export class BlogModule { }
