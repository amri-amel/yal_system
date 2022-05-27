import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {
  registerForm!: FormGroup;
  returnUrl!: string;
  hide!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) {
    
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      password: ['', Validators.required]
    });

  }

  onSubmit() {
    this.userService.addNewUser(this.registerForm.value)
      .subscribe(
        {
          next:data => {
          this.snackBar.open("Utilisateur a été ajouté avec succés", 'Close')
        },
        error: error => {
          this.snackBar.open("Echec :( ", 'Close')
        },
        complete:()=>{

        }
      });
    console.log(this.registerForm.value)
  }

  getErrorMessage() {
    return 'invalid email, try again'
  }
}
