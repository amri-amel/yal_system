import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCourseComponent } from '../shared/courses/add-course/add-course.component';
import { CoursesListComponent } from '../shared/courses/courses-list/courses-list.component';
import { AdminCoursesPageComponent } from './layers/admin-courses-page/admin-courses-page.component';
import { AdminLandpageComponent } from './layers/admin-landpage/admin-landpage.component';
import { UpdateCourseComponent } from '../shared/courses/update-course/update-course.component';



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
            component:CoursesListComponent
          },
          {
            path:'add',
            component: AddCourseComponent
          },
          {
            path:'update/:id',
            component: UpdateCourseComponent
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


