import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SoftTestingComponent } from './soft-testing.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", component: SoftTestingComponent }
    ])
  ]
})
export class SoftTestingModule { }
