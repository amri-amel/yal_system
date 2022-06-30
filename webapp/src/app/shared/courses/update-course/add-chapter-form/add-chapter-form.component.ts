import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-chapter-form',
  templateUrl: './add-chapter-form.component.html',
  styleUrls: ['./add-chapter-form.component.scss']
})
export class AddChapterFormComponent implements OnInit {

  canBeClosed = true;
  primaryButtonText = 'Save Chapter';
  showCancelButton = true;



  chapterForm = this.fb.group({
    title: [null, Validators.required],
    content: [null, Validators.required],
   
  });

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddChapterFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    
  }


  ngOnInit(): void {
    
  }



 

  get f(){
    return this.chapterForm.controls;
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close', data: this.chapterForm.value });
  }

  close() {
    this.dialogRef.close();
  }


}
