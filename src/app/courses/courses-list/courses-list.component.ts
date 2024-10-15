import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';

import { CategoryPipe } from '../../shared/pipe/category.pipe';
import { Courses } from '../model/courses';


@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    CategoryPipe
  ],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss'
})
export class CoursesListComponent {
    @Input() courses: Courses[] = [];
    readonly  displayedColumns = ['name','category','actions'];


    constructor(
       private route: Router,

      ){ }

    onAdd(){
      this.route.navigate(['new'])

    }
}
