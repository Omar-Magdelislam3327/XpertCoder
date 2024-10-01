import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminProjectsComponent } from '../admin-projects/admin-projects.component';
import { AdminBlogsComponent } from '../admin-blogs/admin-blogs.component';
import { AdminCareersComponent } from '../admin-careers/admin-careers.component';
import { AdminClientsComponent } from '../admin-clients/admin-clients.component';
import { AdminMessagesComponent } from '../admin-messages/admin-messages.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: "projects", component: AdminProjectsComponent },
      { path: "blogs", component: AdminBlogsComponent },
      { path: "clients", component: AdminClientsComponent },
      { path: "careers", component: AdminCareersComponent },
      { path: "messages", component: AdminMessagesComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
