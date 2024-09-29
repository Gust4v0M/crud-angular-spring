import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Courses } from './model/courses';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {

  courses: Courses[] = [
    {id: '1', nome: 'Angular', category: 'front-end'}
  ];
  displayedColumns = ['name', 'category']

}
