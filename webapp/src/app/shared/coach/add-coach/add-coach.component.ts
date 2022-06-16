import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CoachService } from '../coach.service';

@Component({
  selector: 'app-add-coach',
  templateUrl: './add-coach.component.html',
  styleUrls: ['./add-coach.component.scss']
})
export class AddCoachComponent implements OnInit {

  public userRole: {value:string, viewValue:string}[] = [
    { value: 'user', viewValue: 'user' },
    { value: 'Admin', viewValue: 'Admin' },
    { value: 'Coach', viewValue: 'Coach' },
    { value: 'Student', viewValue: 'Student' },

  ];

  coachForm = this.fb.group({
    Name: [null, Validators.required],
    Email: [null, Validators.required],
    Role: [null, Validators.required]
   
  });

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private courseService: CoachService,
              private snackBar: MatSnackBar,) {
    ;
  }


  ngOnInit(): void {
    
  }



 

  get f(){
    return this.coachForm.controls;
  }
  
  


  onSubmit(): void {
      this.courseService.addCoach(this.coachForm.value).subscribe({
        next:(data)=>{
          this.router.navigate(['/admin/coaches']);
          this.snackBar.open("Coach inserted successfully", 'Close')
        },
        error:(error)=>{
          this.snackBar.open("Operation Failed", 'Close');
          console.error(error)
        },
        complete:()=>{

        }
      })
  }

}