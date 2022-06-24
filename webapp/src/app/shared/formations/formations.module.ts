import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddFormationComponent } from './add-formation/add-formation.component';
import { ListFormationComponent } from './list-formation/list-formation.component';
import { UpdateFormationComponent } from './update-formation/update-formation.component';



@NgModule({
  declarations: [
    AddFormationComponent,
    ListFormationComponent,
    UpdateFormationComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FormationsModule { }
