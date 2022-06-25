import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chapters-list',
  templateUrl: './chapters-list.component.html',
  styleUrls: ['./chapters-list.component.scss']
})
export class ChaptersListComponent implements OnInit {
  @Input('chapters') chapters:any;
  
  constructor() { }

  ngOnInit(): void {
    
  }

}
