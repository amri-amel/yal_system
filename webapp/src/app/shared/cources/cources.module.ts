import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCourseFormComponent } from './add-course-form/add-course-form.component';
import { CourseListComponent } from './course-list/course-list.component';
import { UpdateCourseFormComponent } from './update-course-form/update-course-form.component';



@NgModule({
  declarations: [
    AddCourseFormComponent,
    CourseListComponent,
    UpdateCourseFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CourcesModule { }
