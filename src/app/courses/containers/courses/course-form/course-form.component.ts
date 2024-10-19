import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

import { CoursesService } from '../../../services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { Courses } from '../../../model/courses';
import { identity } from 'rxjs';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInput,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    MatSnackBarModule,
  ],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss',
})
export class CourseFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    private service: CoursesService,
    private snackbar: MatSnackBar,
    private location: Location,
    private router: ActivatedRoute
  ) {
    this.form = formBuilder.group({

      name: [''],
      category: [''],

    });
  }

  ngOnInit() {
    const course: Courses = this.router.snapshot.data['course'];

    this.form.setValue({

      name: course?.name || '',
      category: course?.category || '',

    })
  }

  onSubmit() {
    this.service.save(this.form.value).subscribe(
      res => this.onSucess(),
      error => this.onError()
    );
  }

  onCancel(){
    this.location.back();
  }

  onSucess(){
    this.snackbar.open('Curso criado com sucesso', '', {
      duration: 5000,
    }), this.onCancel();
  }

  private onError() {
    this.snackbar.open('Erro ao salvar curso', '', {
      duration: 5000,
    });
  }
}
