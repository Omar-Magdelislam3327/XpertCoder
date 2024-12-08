import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminProjectsComponent } from '../admin-projects/admin-projects.component';
import { AdminCareersComponent } from '../admin-careers/admin-careers.component';
import { AdminClientsComponent } from '../admin-clients/admin-clients.component';
import { AdminMessagesComponent } from '../admin-messages/admin-messages.component';
import { AdminTeamComponent } from '../admin-team/admin-team.component';
import { AdminBlogsComponent } from '../admin-blogs/admin-blogs.component';
import { AdminTeamEditComponent } from '../admin-team-edit/admin-team-edit.component';
import { AdminProjectEditComponent } from '../admin-project-edit/admin-project-edit.component';
import { AdminBlogEditComponent } from '../admin-blog-edit/admin-blog-edit.component';
import { AdminClientEditComponent } from '../admin-client-edit/admin-client-edit.component';
import { AdminLoginComponent } from '../admin-login/admin-login.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AdminOpinionsComponent } from '../admin-opinions/admin-opinions.component';

const routes: Routes = [
  { path: "xc-login", component: AdminLoginComponent },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: "projects", canActivate: [AuthGuard], component: AdminProjectsComponent },
      { path: "project-edit/:id", canActivate: [AuthGuard], component: AdminProjectEditComponent },
      { path: "clients", canActivate: [AuthGuard], component: AdminClientsComponent },
      { path: "client-edit/:id", canActivate: [AuthGuard], component: AdminClientEditComponent },
      { path: "careers", canActivate: [AuthGuard], component: AdminCareersComponent },
      { path: "messages", canActivate: [AuthGuard], component: AdminMessagesComponent },
      { path: "team", canActivate: [AuthGuard], component: AdminTeamComponent },
      { path: "team-edit/:id", canActivate: [AuthGuard], component: AdminTeamEditComponent },
      { path: "blogs", canActivate: [AuthGuard], component: AdminBlogsComponent },
      { path: "blog-edit/:id", canActivate: [AuthGuard], component: AdminBlogEditComponent },
      // { path: "blog-edit/:id", canActivate: [AuthGuard], component: AdminOpinionsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
