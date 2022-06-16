import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCourseComponent } from '../shared/courses/add-course/add-course.component';
import { CoursesListComponent } from '../shared/courses/courses-list/courses-list.component';
import { AdminCoursesPageComponent } from './layers/admin-courses-page/admin-courses-page.component';
import { AdminLandpageComponent } from './layers/admin-landpage/admin-landpage.component';
import { UpdateCourseComponent } from '../shared/courses/update-course/update-course.component';
import { CourseResolver } from '../shared/courses/course.resolver';
import { AdminCoachesPageComponent } from './layers/admin-coaches-page/admin-coaches-page.component';
import { CoachListComponent } from '../shared/coach/coach-list/coach-list.component';
import { AddCoachComponent } from '../shared/coach/add-coach/add-coach.component';
import { UpdateCoachComponent } from '../shared/coach/update-coach/update-coach.component';




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
            component: UpdateCourseComponent,
            resolve:{
              course:CourseResolver
            }
          }
        ]
      },
      //coachs
      {
        path:'coaches',
        component: AdminCoachesPageComponent,
        children:[
          {
            path:'',
            component:CoachListComponent
          },
          {
            path:'add',
            component: AddCoachComponent
          },
          {
            path:'update/:id',
            component: UpdateCoachComponent,
            resolve:{
              course:CourseResolver
            }
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


