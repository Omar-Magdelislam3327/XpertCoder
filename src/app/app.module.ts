import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './userPanel/home/home.component';
import { NavbarComponent } from './userPanel/shared/navbar/navbar.component';
import { CarouselModule } from 'primeng/carousel';
import { DialogModule } from 'primeng/dialog';
import { AboutComponent } from './userPanel/about/about.component';
import { FooterComponent } from './userPanel/shared/footer/footer.component';
import { WebComponent } from './userPanel/services/web/web.component';
import { MobileComponent } from './userPanel/services/mobile/mobile.component';
import { UiuxComponent } from './userPanel/services/uiux/uiux.component';
import { SoftTestingComponent } from './userPanel/services/soft-testing/soft-testing.component';
import { PortfolioComponent } from './userPanel/portfolio/portfolio.component';
import { CustomCursorComponent } from './custom-cursor/custom-cursor.component';
import { ProjectDetailsComponent } from './userPanel/project-details/project-details.component';
import { JoinComponent } from './userPanel/join/join.component';
import { ContactComponent } from './userPanel/contact/contact.component';
import { BlogComponent } from './userPanel/blog/blog.component';
import { AdminComponent } from './adminPanel/admin/admin.component';
import { AdminProjectsComponent } from './adminPanel/admin-projects/admin-projects.component';
import { AdminClientsComponent } from './adminPanel/admin-clients/admin-clients.component';
import { AdminCareersComponent } from './adminPanel/admin-careers/admin-careers.component';
import { AdminMessagesComponent } from './adminPanel/admin-messages/admin-messages.component';
import { FormsModule } from '@angular/forms';
import { AdminTeamComponent } from './adminPanel/admin-team/admin-team.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BlogDetailsComponent } from './userPanel/blog-details/blog-details.component';
import { AdminBlogsComponent } from './adminPanel/admin-blogs/admin-blogs.component';
import { AdminTeamEditComponent } from './adminPanel/admin-team-edit/admin-team-edit.component';
import { AdminProjectEditComponent } from './adminPanel/admin-project-edit/admin-project-edit.component';
import { AdminBlogEditComponent } from './adminPanel/admin-blog-edit/admin-blog-edit.component';
import { AdminClientEditComponent } from './adminPanel/admin-client-edit/admin-client-edit.component';
import { AdminLoginComponent } from './adminPanel/admin-login/admin-login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    AboutComponent,
    FooterComponent,
    WebComponent,
    MobileComponent,
    UiuxComponent,
    SoftTestingComponent,
    PortfolioComponent,
    CustomCursorComponent,
    ProjectDetailsComponent,
    JoinComponent,
    ContactComponent,
    BlogComponent,
    AdminComponent,
    AdminProjectsComponent,
    AdminClientsComponent,
    AdminCareersComponent,
    AdminMessagesComponent,
    AdminTeamComponent,
    BlogDetailsComponent,
    AdminBlogsComponent,
    AdminTeamEditComponent,
    AdminProjectEditComponent,
    AdminBlogEditComponent,
    AdminClientEditComponent,
    AdminLoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    DialogModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
