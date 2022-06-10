import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackofficeRoutingModule } from './backoffice-routing.module';
import { AdminNavbarComponent } from './layers/admin-navbar/admin-navbar.component';
import { AdminFooterComponent } from './layers/admin-footer/admin-footer.component';
import { AdminLandpageComponent } from './layers/admin-landpage/admin-landpage.component';
import { AdminCoursesPageComponent } from './layers/admin-courses-page/admin-courses-page.component';
import { AdminTrainingPageComponent } from './layers/admin-training-page/admin-training-page.component';
import { AdminUsersPageComponent } from './layers/admin-users-page/admin-users-page.component';
import { AdminCoachesPageComponent } from './layers/admin-coaches-page/admin-coaches-page.component';
import { UserModule } from '../shared/user/user.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CoursesModule } from '../shared/courses/courses.module';


@NgModule({
  declarations: [
    AdminNavbarComponent,
    AdminFooterComponent,
    AdminLandpageComponent,
    AdminCoursesPageComponent,
    AdminTrainingPageComponent,
    AdminUsersPageComponent,
    AdminCoachesPageComponent
  ],
  imports: [
    CommonModule,
    BackofficeRoutingModule,
    UserModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoursesModule
  ]
})
export class BackofficeModule { }
