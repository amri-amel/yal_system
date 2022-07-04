import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgSelectConfig } from '@ng-select/ng-select';
import { Subscription } from 'rxjs';
import { ICoach } from '../../coach/coach.model';
import { CoachService } from '../../coach/coach.service';
import { ICourse } from '../../courses/course.model';
import { CoursesService } from '../../courses/courses.service';
import { FormationService } from '../formation.service';


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
  formationServiceSubscription:Subscription
  
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
    private coachService:CoachService,
    private formationService:FormationService,
    private matSnackBar:MatSnackBar
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
    let formationBody={
      titre:this.formationForm.value.titre,
      duree:this.formationForm.value.duree,
      theme:this.formationForm.value.theme,
      courses:this.formationForm.value.courses.map(c=>c.id),
      coach:this.formationForm.value.coach.id
    }
    console.log(formationBody)
    
    this.formationServiceSubscription=this.formationService
      .addFormation(formationBody).subscribe({
        next: (result:any)=>{
          this.matSnackBar.open('Traning Session Added Successfully','x')
        },
        error: (error:any)=>{
          this.matSnackBar.open('Sory Error occured When saving Training Session','x')
        }
      })
  }
  
  ngOnDestroy(): void {
   this.coursesSubscription.unsubscribe();
   this.couachSubscription.unsubscribe();
  }
}
