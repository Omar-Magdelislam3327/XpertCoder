import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './userPanel/home/home.component';
import { AboutComponent } from './userPanel/about/about.component';
import { WebComponent } from './userPanel/web/web.component';
import { MobileComponent } from './userPanel/mobile/mobile.component';
import { UiuxComponent } from './userPanel/uiux/uiux.component';
import { SoftTestingComponent } from './userPanel/soft-testing/soft-testing.component';
import { PortfolioComponent } from './userPanel/portfolio/portfolio.component';
import { ProjectDetailsComponent } from './userPanel/project-details/project-details.component';
import { JoinComponent } from './userPanel/join/join.component';
import { ContactComponent } from './userPanel/contact/contact.component';
import { BlogComponent } from './userPanel/blog/blog.component';

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
  { path: "blog", component: BlogComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
