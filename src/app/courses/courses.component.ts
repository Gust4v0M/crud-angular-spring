import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { Courses } from './model/courses';
import { CoursesService } from './services/courses.service';
import { Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [MatTableModule, MatCardModule,MatToolbarModule, CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit{

  courses: Observable<Courses[]>;
  displayedColumns = ['name', 'category']

  constructor(private coursesService: CoursesService){
    this.courses = this.coursesService.list()
  }

 ngOnInit(): void {
 }
}
