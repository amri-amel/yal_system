import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgSelectConfig } from '@ng-select/ng-select';
import { Subscription } from 'rxjs';
import { ICoach } from '../../coach/coach.model';
import { CoachService } from '../../coach/coach.service';
import { ICourse } from '../../courses/course.model';
import { CoursesService } from '../../courses/courses.service';


@Component({
  selector: 'app-add-formation',
  templateUrl: './add-formation.component.html',
  styleUrls: ['./add-formation.component.scss']
})
export class AddFormationComponent implements OnInit,OnDestroy {
  coursesList:ICourse[];
  coachList:ICoach[];
  coursesSubscription:Subscription;
  couachSubscription:Subscription;
  
  formationForm:FormGroup=this.fb.group({
    titre:['',Validators.required],
    theme:['',Validators.required],
    duree:['',Validators.required],
    courses:[[],Validators.required],
    coach:['',Validators.required]
  })

  constructor(  
    private fb:FormBuilder, 
    private coursesServices:CoursesService,
    private coachService:CoachService
    ) { }
   
   ngOnInit(): void {
     this.coursesSubscription=this.coursesServices.getAllCourses().subscribe({
       next:(data:any)=>{
         let course=data['rows'];
         this.coursesList=course;
        },
      error:()=>{

      }
    })

    this.couachSubscription=this.coachService.getAllCoaches().subscribe({
      next:(data:any)=>{
        let coaches=data['rows'];
        console.log(coaches)
        this.coachList=coaches;
       },
     error:()=>{

     }
   })
  }

  postFormation(){
    console.log(this.formationForm.value)
  }
  
  ngOnDestroy(): void {
   this.coursesSubscription.unsubscribe();
   this.couachSubscription.unsubscribe();
  }
}
