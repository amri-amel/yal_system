import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './login-form/login-form.component';
import { HttpClientModule } from '@angular/common/http';
import { UserBadgeComponent } from './user-badge/user-badge.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [RegisterFormComponent, LoginFormComponent, UserBadgeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  exports:[RegisterFormComponent, LoginFormComponent,UserBadgeComponent]
})
export class UserModule { }
