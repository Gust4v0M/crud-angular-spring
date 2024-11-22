import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { CategoryPipe } from '../../../shared/pipe/category.pipe';
import { Courses } from '../../model/courses';


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
    @Output() add = new EventEmitter();
    @Output() edit = new EventEmitter();
    @Output() delete = new EventEmitter();
    readonly  displayedColumns = ['name','category','actions'];
    constructor(){ }

    onAdd(){
      //this.route.navigate(['new'])
      this.add.emit();
    }
    onEdit(course: Courses){
      this.edit.emit(course);
    }

    onDelete(course: string){
      this.delete.emit(course)
    }
}
