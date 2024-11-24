import { Courses } from './../../model/courses';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';

import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { CoursesListComponent } from '../../components/courses-list/courses-list.component';
import { CoursesService } from '../../services/courses.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { CoursePage } from '../../model/course-page';
import { MatPaginator, PageEvent } from '@angular/material/paginator';



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
    MatSnackBarModule,
    MatPaginator
],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent implements OnInit {
  courses$: Observable<CoursePage> | null = null;
  isLoading$ = new BehaviorSubject<boolean>(true);

  displayedColumns = ['name','category','actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageIndex = 0;
  pageSize = 10;


  constructor(
    private readonly coursesService: CoursesService,
    public dialog: MatDialog,
    private route: Router,
    private snackbar: MatSnackBar
  ) {
    this.onReload()

  }

  onReload(pageEvent: PageEvent = { length: 0, pageIndex: 0, pageSize: 10 }) {
    this.isLoading$.next(true); // Inicia o estado de carregamento
    this.courses$ = this.coursesService
      .list(pageEvent.pageIndex, pageEvent.pageSize)
      .pipe(
        tap(() => {
          this.pageIndex = pageEvent.pageIndex;
          this.pageSize = pageEvent.pageSize;
          this.isLoading$.next(false); // Finaliza o estado de carregamento
        }),
        catchError(error => {
          this.onError('Erro ao carregar cursos');
          this.isLoading$.next(false); // Finaliza o estado de carregamento mesmo com erro
          return of({ courses: [], totalElements: 0, totalPages: 0 });
        })
      );
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
  }  openDialog(): void {
  }

  onDelete(course: Courses){

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover o curso?',
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
        if(result){
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
    });


  }
}

