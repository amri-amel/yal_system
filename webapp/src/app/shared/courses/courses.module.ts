import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCourceComponent } from './add-cource/add-cource.component';
import { UpdateCourceComponent } from './update-cource/update-cource.component';
import { CourcesListComponent } from './cources-list/cources-list.component';



@NgModule({
  declarations: [
    AddCourceComponent,
    UpdateCourceComponent,
    CourcesListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CoursesModule { }
