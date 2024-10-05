import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './userPanel/home/home.component';
import { AboutComponent } from './userPanel/about/about.component';
import { WebComponent } from './userPanel/services/web/web.component';
import { MobileComponent } from './userPanel/services/mobile/mobile.component';
import { UiuxComponent } from './userPanel/services/uiux/uiux.component';
import { SoftTestingComponent } from './userPanel/services/soft-testing/soft-testing.component';
import { PortfolioComponent } from './userPanel/portfolio/portfolio.component';
import { ProjectDetailsComponent } from './userPanel/project-details/project-details.component';
import { JoinComponent } from './userPanel/join/join.component';
import { ContactComponent } from './userPanel/contact/contact.component';
import { BlogComponent } from './userPanel/blog/blog.component';
import { AdminComponent } from './adminPanel/admin/admin.component';
import { AdminProjectsComponent } from './adminPanel/admin-projects/admin-projects.component';
import { AdminClientsComponent } from './adminPanel/admin-clients/admin-clients.component';
import { AdminCareersComponent } from './adminPanel/admin-careers/admin-careers.component';
import { AdminMessagesComponent } from './adminPanel/admin-messages/admin-messages.component';
import { AdminTeamComponent } from './adminPanel/admin-team/admin-team.component';
import { BlogDetailsComponent } from './userPanel/blog-details/blog-details.component';
import { AdminBlogsComponent } from './adminPanel/admin-blogs/admin-blogs.component';
import { AdminTeamEditComponent } from './adminPanel/admin-team-edit/admin-team-edit.component';
import { AdminProjectEditComponent } from './adminPanel/admin-project-edit/admin-project-edit.component';
import { AdminBlogEditComponent } from './adminPanel/admin-blog-edit/admin-blog-edit.component';
import { AdminClientEditComponent } from './adminPanel/admin-client-edit/admin-client-edit.component';
import { AdminLoginComponent } from './adminPanel/admin-login/admin-login.component';
import { AuthGuard } from './guards/auth.guard';
const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "about", component: AboutComponent },
  { path: "web", component: WebComponent },
  { path: "mobile", component: MobileComponent },
  { path: "ui", component: UiuxComponent },
  { path: "testing", component: SoftTestingComponent },
  { path: "portfolio", component: PortfolioComponent },
  { path: "project/:id", component: ProjectDetailsComponent },
  { path: "join", component: JoinComponent },
  { path: "contact", component: ContactComponent },
  { path: "blog", component: BlogComponent },
  { path: "blog/:id", component: BlogDetailsComponent },
  { path: "xc-login", component: AdminLoginComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
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
      { path: "blog-edit/:id", canActivate: [AuthGuard], component: AdminBlogEditComponent }
    ]
  },
  { path: "**", redirectTo: "home", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
