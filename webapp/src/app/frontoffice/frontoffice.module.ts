import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontofficeRoutingModule } from './frontoffice-routing.module';
import { GuestWrapComponent } from './layers/guest-wrap/guest-wrap.component';
import { GuestNavbarComponent } from './layers/guest-navbar/guest-navbar.component';
import { GuestFooterComponent } from './layers/guest-footer/guest-footer.component';
import { CoursesPageComponent } from './layers/courses-page/courses-page.component';
import { TrainingsessionPageComponent } from './layers/trainingsession-page/trainingsession-page.component';
import { AboutusPageComponent } from './layers/aboutus-page/aboutus-page.component';
import { ContactPageComponent } from './layers/contact-page/contact-page.component';
import { CertificationPageComponent } from './layers/certification-page/certification-page.component';
import { LandpageComponent } from './layers/landpage/landpage.component';
import { UserModule } from '../shared/user/user.module';



@NgModule({
  declarations: [
    GuestWrapComponent,
    GuestNavbarComponent,
    GuestFooterComponent,
    CoursesPageComponent,
    TrainingsessionPageComponent,
    AboutusPageComponent,
    ContactPageComponent,
    CertificationPageComponent,
    LandpageComponent,
  
  ],
  imports: [
    CommonModule,
    FrontofficeRoutingModule,
    UserModule
  ]
})
export class FrontofficeModule { }