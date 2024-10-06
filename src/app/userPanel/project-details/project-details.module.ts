import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectDetailsComponent } from './project-details.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ProjectDetailsComponent }
    ])
  ]
})
export class ProjectDetailsModule { }
