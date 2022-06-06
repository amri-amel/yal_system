import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCourseFormComponent } from '../shared/cources/add-course-form/add-course-form.component';
import { CourseListComponent } from '../shared/cources/course-list/course-list.component';
import { UpdateCourseFormComponent } from '../shared/cources/update-course-form/update-course-form.component';
import { AdminCoursesPageComponent } from './layers/admin-courses-page/admin-courses-page.component';
import { AdminLandpageComponent } from './layers/admin-landpage/admin-landpage.component';

const routes: Routes = [
  {
    path:'',
    component:AdminLandpageComponent,
    children:[
      {
        path:'',
        component:AdminCoursesPageComponent

      },
      {
        path:'courses',
        component: AdminCoursesPageComponent,
        children:[
          {
            path:'',
            component:CourseListComponent
          },
          {
            path:'add',
            component: AddCourseFormComponent
          },
          {
            path:'update/:id',
            component: UpdateCourseFormComponent
          }
        ]
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule { }


//TODO: to fix admin routing and navigation