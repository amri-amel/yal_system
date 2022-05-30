import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusPageComponent } from './layers/aboutus-page/aboutus-page.component';
import { CertificationPageComponent } from './layers/certification-page/certification-page.component';
import { ContactPageComponent } from './layers/contact-page/contact-page.component';
import { CoursesPageComponent } from './layers/courses-page/courses-page.component';
import { GuestWrapComponent } from './layers/guest-wrap/guest-wrap.component';
import { LandpageComponent } from './layers/landpage/landpage.component';

const routes: Routes = [
  {
    path: '', component: GuestWrapComponent,
    children: [
      {
        path: 'home',
        component: LandpageComponent
      },
      {
        path: 'courses',
        component: CoursesPageComponent,

      },
      {
        path: 'certifications',
        component: CertificationPageComponent,

      },
      {
        path: 'about',
        component: AboutusPageComponent,

      },
      {
        path: 'contact',
        component: ContactPageComponent,

      },
      {
        path: '**',
        redirectTo: 'home',
        //  pathMatch: 'full'
      }
    ],

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontofficeRoutingModule { }
