import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { catchError, Observable, of } from 'rxjs';

import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { Courses } from '../../model/courses';
import { CoursesService } from '../../services/courses.service';
import { Router } from '@angular/router';
import { CoursesListComponent } from "../../components/courses-list/courses-list.component";



@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    CoursesListComponent
],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Courses[]>;
  displayedColumns = ['name','category','actions'];

  constructor(
    private readonly coursesService: CoursesService,
    public dialog: MatDialog,
    private route: Router,
  ) {
    this.courses$ = this.coursesService.list()
    .pipe(
      catchError(error =>{
        this.onError('Erro ao carregar cursos')
        return of([])
      })
    )
  }


  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data:errorMsg
    });
  }

  ngOnInit(): void {
  }

  onAdd(){
    this.route.navigate(['new'])
  }

  onEdit(course: Courses){
    this.route.navigate(['edit', course._id])
  }
}

