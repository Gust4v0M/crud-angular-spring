import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

import { CoursesService } from '../services/courses.service';

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
  styleUrl: './course-form.component.css',
})
export class CourseFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    private service: CoursesService,
    private snackbar: MatSnackBar
  ) {
    this.form = formBuilder.group({
      name: [null],
      category: [null],
    });
  }

  ngOnInit() {}

  onSubmit() {
    this.service.save(this.form.value).subscribe(
      (res) => console.log(res),
      (error) => this.onError()
    );
  }

  onCancel() {}

  private onError() {
    this.snackbar.open('Erro ao salvar curso', '', {
      duration: 5000,
    });
  }
}
