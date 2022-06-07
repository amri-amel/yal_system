import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCoursesPageComponent } from './layers/admin-courses-page/admin-courses-page.component';
import { AdminLandpageComponent } from './layers/admin-landpage/admin-landpage.component';
import { CourcesListComponent } from '../shared/courses/courses-list/courses-list.component';
import { AddCourceComponent, AddCourseComponent } from '../shared/courses/add-course/add-course.component';
import { UpdateCourceComponent } from '../shared/courses/update-course/update-course.component';

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
            component:CourcesListComponent
          },
          {
            path:'add',
            component: AddCourseComponent
          },
          {
            path:'update/:id',
            component: UpdateCourceComponent
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