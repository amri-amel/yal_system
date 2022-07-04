import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgSelectConfig } from '@ng-select/ng-select';
import { Subscription } from 'rxjs';
import { ICourse } from '../../courses/course.model';
import { CoursesService } from '../../courses/courses.service';


@Component({
  selector: 'app-add-formation',
  templateUrl: './add-formation.component.html',
  styleUrls: ['./add-formation.component.scss']
})
export class AddFormationComponent implements OnInit {
  formationForm:FormGroup;
  coursesList:ICourse[];
  coursesSubscription:Subscription

  constructor( 
    private config: NgSelectConfig, 
    private fb:FormBuilder, 
    private coursesServices:CoursesService
    ) {
    this.config.notFoundText = 'Course not found';
    this.config.appendTo = 'body';
    this.config.bindValue = 'value';
    this.formationForm=this.fb.group({
      titre:['',Validators.required],
      theme:['',Validators.required],
      duree:['',Validators.required],
      courses:[[]],
      coach:[null]
    })
   }

  ngOnInit(): void {
    this.coursesSubscription=this.coursesServices.getAllCourses().subscribe({
      next:(data:any)=>{
        let course=data['rows'];
        this.coursesList=course;
      },
      error:()=>{

      }
    })
  }

}
