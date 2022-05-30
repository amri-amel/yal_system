import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestWrapComponent } from './frontoffice/layers/guest-wrap/guest-wrap.component';
import { LoginFormComponent } from './shared/user/login-form/login-form.component';
import { RegisterFormComponent } from './shared/user/register-form/register-form.component';

const routes: Routes = [
  {
    path:'login', component:LoginFormComponent
  },
  {
    path:'signup',component:RegisterFormComponent
  },
  {
    path: 'front',
    loadChildren: () => import('./frontoffice/frontoffice.module').then(m => m.FrontofficeModule),
    // canLoad:[AuthGuard],
    // canActivate:[AuthGuard],
    // canActivateChild:[AuthGuard]
  },
  // {
  //   path: 'back',
  //   loadChildren: () => import('./back-office/back-office.module').then(m => m.BackOfficeModule),
  //   canLoad:[AuthGuard,AdminGuard],
  //   canActivate:[AuthGuard,AdminGuard],
  //   canActivateChild:[AuthGuard,AdminGuard]
  // }
  // , 
  {
    path: '**',
    redirectTo: 'front',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
