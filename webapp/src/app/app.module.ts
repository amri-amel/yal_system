import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserModule } from './shared/user/user.module';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
import { NgxUploaderModule } from 'ngx-uploader';




@NgModule({
  declarations: [
    AppComponent,
    ConfirmationDialogComponent,
   
   
   
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    UserModule,
    HttpClientModule,
    FormsModule,
    NgxUploaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
