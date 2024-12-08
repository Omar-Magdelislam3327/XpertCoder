import { AboutModule } from './userPanel/about/about.module';
import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
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
import { AdminOpinionsComponent } from './adminPanel/admin-opinions/admin-opinions.component';
import { AdminOpinionsEditComponent } from './adminPanel/admin-opinions-edit/admin-opinions-edit.component';
const routes: Routes = [
  { path: "home", loadChildren: () => import('./userPanel/home/home.module').then(m => m.HomeModule), title: "XpertCoder |  Leading Web & Mobile Development" },
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "about", title: "XpertCoder | About", loadChildren: () => import('./userPanel/about/about.module').then(m => m.AboutModule) },
  { path: "services/web", title: "XpertCoder | Professional  Web Development Solutions", loadChildren: () => import("./userPanel/services/web/web.module").then(m => m.WebModule) },
  { path: "services/mobile", title: "XpertCoder | Tailored Mobile App Development Services", loadChildren: () => import("./userPanel/services/mobile/mobile.module").then(m => m.MobileModule) },
  { path: "services/ui", title: "XpertCoder | Expert UI/UX Design Services", loadChildren: () => import("./userPanel/services/uiux/uiux.module").then(m => m.UiuxModule) },
  { path: "services/testing", title: "XpertCoder | Comprehensive Software Testing", loadChildren: () => import("./userPanel/services/soft-testing/soft-testing.module").then(m => m.SoftTestingModule) },
  { path: "portfolio", title: "XpertCoder | Web & Mobile Development Portfolio", loadChildren: () => import("./userPanel/portfolio/portfolio.module").then(m => m.PortfolioModule) },
  { path: "project/:id", title: "XpertCoder | Portfolio", loadChildren: () => import("./userPanel/project-details/project-details.module").then(m => m.ProjectDetailsModule) },
  { path: "join", title: "XpertCoder | Join Us", loadChildren: () => import("./userPanel/join/join.module").then(m => m.JoinModule) },
  { path: "contact", title: "XpertCoder | Contact Us", loadChildren: () => import("./userPanel/contact/contact.module").then(m => m.ContactModule) },
  { path: "blog", title: "XpertCoder | Blog", loadChildren: () => import("./userPanel/blog/blog.module").then(m => m.BlogModule) },
  { path: "blog/:id", title: "XpertCoder | Blog", loadChildren: () => import("./userPanel/blog-details/blog-details.module").then(m => m.BlogDetailsModule) },
  { path: "xc-login", component: AdminLoginComponent, title: "XpertCoder | Login" },
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
      { path: "blog-edit/:id", canActivate: [AuthGuard], component: AdminBlogEditComponent },
      { path: "opinions", canActivate: [AuthGuard], component: AdminOpinionsComponent },
      { path: "opinion-edit/:id", canActivate: [AuthGuard], component: AdminOpinionsEditComponent },
    ]
  },
  { path: "**", redirectTo: "home", pathMatch: "full" }
];
const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
};

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
