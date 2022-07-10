import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICoach } from 'src/app/shared/coach/coach.model';
import { CoachService } from 'src/app/shared/coach/coach.service';
import { ICourse } from 'src/app/shared/courses/course.model';
import { CoursesService } from 'src/app/shared/courses/courses.service';
import { FormationService } from '../../formation.service';

@Component({
  selector: 'app-update-formation',
  templateUrl: './update-formation.component.html',
  styleUrls: ['./update-formation.component.scss']
})
export class UpdateFormationComponent implements OnInit,OnDestroy {

  
  coursesSubscription:Subscription;
  couachSubscription:Subscription;
  formationServiceSubscription:Subscription;
  currentFormationId : string='';
  public ngSelect?: any;
  coursesList:ICourse[];
  coachList:ICoach[];
  
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
  
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
    )
   { }
  

  
   
 
  ngOnInit(): void {
    this.route.data.subscribe({
      next: (data) => {
        let formation=data['formation'];
        this.currentFormationId = formation.id;
        this.formationForm.patchValue({
          titre:formation['titre'],
          theme:formation['theme'],
          duree:formation['duree'],
          
        })

        this.coursesList=formation['courses'];
        this.coachList=formation['coaches'];
   

       },
       error: (error) => console.log(error),
    });
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
    
      let formation = this.formationForm.value;
      formation.courses=this.coursesList;

    this.formationService.updateFormation(this.currentFormationId, formation).subscribe({
      next: (data) => {
        this.router.navigate(['/admin/formations']);
        this.snackBar.open('training Updated Successfully', 'x');
      },
      error: (error) => {
        this.snackBar.open('Fail to update training', 'x');
        console.error(error);
      },
      complete: () => {},
    });
  }
  ngOnDestroy(): void {
    this.coursesSubscription.unsubscribe();
    this.couachSubscription.unsubscribe();
   }
}
