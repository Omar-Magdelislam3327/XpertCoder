import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './userPanel/home/home.component';
import { NavbarComponent } from './userPanel/navbar/navbar.component';
import { CarouselModule } from 'primeng/carousel';
import { DialogModule } from 'primeng/dialog';
import { AboutComponent } from './userPanel/about/about.component';
import { FooterComponent } from './userPanel/footer/footer.component';
import { WebComponent } from './userPanel/web/web.component';
import { MobileComponent } from './userPanel/mobile/mobile.component';
import { UiuxComponent } from './userPanel/uiux/uiux.component';
import { SoftTestingComponent } from './userPanel/soft-testing/soft-testing.component';
import { PortfolioComponent } from './userPanel/portfolio/portfolio.component';
import { CustomCursorComponent } from './custom-cursor/custom-cursor.component';
import { ProjectDetailsComponent } from './userPanel/project-details/project-details.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    DialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
