import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, merge, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { ICoach } from '../coach.model';
import { CoachService } from '../coach.service';
import { CoashListDataSource } from './CoachListDataSource';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';


@Component({
  selector: 'app-coach-list',
  templateUrl: './coach-list.component.html',
  styleUrls: ['./coach-list.component.scss']
})
export class CoachListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatTable) table!: MatTable<ICoach>;
  @ViewChild('queryField') queryField: ElementRef;

  dataSource: CoashListDataSource;
  datasourceLength:number=1;
  displayedColumns = ['name','email','role','actions'];

  constructor(
    private coachService:CoachService, 
    private route:Router,
    private snackBar:MatSnackBar,
    public dialog: MatDialog) {
    this.dataSource = new CoashListDataSource(this.coachService);
    
  }

  ngOnInit(): void {
    this.dataSource.loadCourses('',1, 10);
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(()=>this.paginator.pageIndex=1);
    // @ts-ignore
    fromEvent(this.queryField.nativeElement,'keyup')
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadCoachPage
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadCoachPage())
      )
      .subscribe();
  }

  loadCoachPage() {
    this.dataSource.loadCourses(
      this.queryField.nativeElement.value,
      this.paginator.pageIndex+1,
      this.paginator.pageSize);
  }

  removeCoache(id:string){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '450px',
      data: "Are you sure to delete this coach? "
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.coachService.removeCoach(id).subscribe({
          next:(data)=>{
                this.snackBar.open('Coachs deleted successfully ','X');
                this.dataSource.loadCourses('',1, 10);
          },
          error:(error)=>{
            this.snackBar.open(`Error ${JSON.stringify(error)}`);
          },
          complete:()=>{}
        })
      }
    });
  }

  updateCoach(id:string){
   this.route.navigate(['/admin/coaches/update',id])
  }

  gotoAddCoachForm(){
    this.route.navigate(['/admin/coaches/add'])
  }
  

}
