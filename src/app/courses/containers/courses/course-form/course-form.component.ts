import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, UntypedFormArray, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute } from '@angular/router';

import { Courses } from '../../../model/courses';
import { Lesson } from '../../../model/lesson';
import { CoursesService } from '../../../services/courses.service';

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
    MatFormFieldModule,
    CommonModule,
    MatIcon
  ],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss',
})
export class CourseFormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    public formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackbar: MatSnackBar,
    private location: Location,
    private router: ActivatedRoute
  ) {
    // this.form = formBuilder.group({

    //   _id: [''],
    //   name: ['', [Validators.required,
    //     Validators.minLength(5),
    //     Validators.maxLength(100)]],
    //   category: ['',  [Validators.required,
    //     Validators.minLength(5),
    //     Validators.maxLength(100)]],

    // });
  }

  ngOnInit() {
    const course: Courses = this.router.snapshot.data['course'];
    this.form = this.formBuilder.group({
      _id: [course._id],
      name: [course.name, [Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)]],
      category: [course.category,  [Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)]],
        lessons: this.formBuilder.array(this.retriveLessons(course))
    });
console.log(this.form);
console.log(this.form.value);
  }

  private retriveLessons(course: Courses){
    const lessons:any =[];
    if(course?.lessons){
      course.lessons.forEach(lesson => lessons.push(this.createLessons(lesson)))
    }else{
      lessons.push(this.createLessons())
    }
    return lessons;
  }

  obgLesson(){
    return (<UntypedFormArray>this.form.get('lessons')).controls;
  }

  private createLessons(lesson: Lesson = {id:'', name: '', youtubeUrl: ''}){
      return this.formBuilder.group({
        id: [lesson.id],
        name: [lesson.name],
        youtubeUrl: [lesson.youtubeUrl]
      });

    }

  errorMessage(value: any){
    const field = this.form.get(value)

    if(field?.hasError('required')){
      return 'Precisa colocar algum valor'
    }
    if(field?.hasError('minlength')){
      const requiredLength: number = field.errors ? field.errors['minlength']['requiredLength'] : 5;
      return `Tamanho mínimo precisa ser de ${requiredLength} caracteres`;
    }
    if(field?.hasError('maxlength')){
      const requiredLength: number = field.errors ? field.errors['maxlength']['requiredLength'] : 100;
      return `Tamanho máximo precisa ser de ${requiredLength} caracteres`;
    }
return 'Erro'
  }

  removeLesson(index: number){
    const lessons = this.form.get('lessons') as UntypedFormArray
    lessons.removeAt(index);
  }

  addNewLesson(){
   const lessons = this.form.get('lessons') as UntypedFormArray
   lessons.push(this.createLessons())
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
