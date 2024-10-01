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
import { AdminBlogsComponent } from './adminPanel/admin-blogs/admin-blogs.component';
import { AdminClientsComponent } from './adminPanel/admin-clients/admin-clients.component';
import { AdminCareersComponent } from './adminPanel/admin-careers/admin-careers.component';
import { AdminMessagesComponent } from './adminPanel/admin-messages/admin-messages.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "about", component: AboutComponent },
  { path: "web", component: WebComponent },
  { path: "mobile", component: MobileComponent },
  { path: "ui", component: UiuxComponent },
  { path: "testing", component: SoftTestingComponent },
  { path: "portfolio", component: PortfolioComponent },
  { path: "project", component: ProjectDetailsComponent },
  { path: "join", component: JoinComponent },
  { path: "contact", component: ContactComponent },
  { path: "blog", component: BlogComponent },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: "projects", component: AdminProjectsComponent },
      { path: "blogs", component: AdminBlogsComponent },
      { path: "clients", component: AdminClientsComponent },
      { path: "careers", component: AdminCareersComponent },
      { path: "messages", component: AdminMessagesComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
