import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddFormationComponent } from './add-formation/add-formation.component';
import { ListFormationComponent } from './list-formation/list-formation.component';
import { UpdateFormationComponent } from './update-formation/update-formation.component';
import { AdminListeFormationComponent } from './admin/admin-liste-formation/admin-liste-formation.component';
import { AdminPlanifierFormationComponent } from './admin/admin-planifier-formation/admin-planifier-formation.component';
import { MaterialModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AddFormationComponent,
    ListFormationComponent,
    UpdateFormationComponent,
    AdminListeFormationComponent,
    AdminPlanifierFormationComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class FormationsModule { }
