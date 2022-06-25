import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AddCourseComponent } from './add-course/add-course.component';
import { UpdateCourseComponent } from './update-course/update-course.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { UploadCourseCoverComponent } from './upload-course-cover/upload-course-cover.component';
import { NgxUploaderModule } from 'ngx-uploader';
import { UploadCourseChapitresComponent } from './upload-course-chapitres/upload-course-chapitres.component';



@NgModule({
  declarations: [
    AddCourseComponent,
    UpdateCourseComponent,
    CoursesListComponent,
    UploadCourseCoverComponent,
    UploadCourseChapitresComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxUploaderModule
  ],
  exports:[
    AddCourseComponent,
    UpdateCourseComponent,
    CoursesListComponent,
    UploadCourseCoverComponent,
    UploadCourseChapitresComponent
  ]
})
export class CoursesModule { }
