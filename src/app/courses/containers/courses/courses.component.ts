import { Courses } from './../../model/courses';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';

import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { CoursesListComponent } from '../../components/courses-list/courses-list.component';
import { CoursesService } from '../../services/courses.service';



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
    CoursesListComponent,
    MatSnackBarModule
],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Courses[]> | null = null;
  displayedColumns = ['name','category','actions'];

  constructor(
    private readonly coursesService: CoursesService,
    public dialog: MatDialog,
    private route: Router,
    private snackbar: MatSnackBar
  ) {
    this.onReload()

  }

  onReload(){
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

  onDelete(course: Courses){
    this.coursesService.delete(course._id)
    .subscribe(
      res =>{
        this.onReload(),
        this.snackbar.open('Curso Deletado com sucesso', '', {
          duration: 5000,
          verticalPosition:'top',
          horizontalPosition: 'center'
        })
      },
      error => this.onError('Erro ao tentar remover curso')
    )
  }
}

