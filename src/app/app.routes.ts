import { Routes } from '@angular/router';
import { courseResolver } from './courses/guards/course.resolver';


export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo:'courses' },
  {
    path:'courses', loadComponent:() => import('./courses/containers/courses/courses.component').then(c => c.CoursesComponent)
  },
  {
    path:'new', loadComponent:() => import('./courses/containers/courses/course-form/course-form.component').then(c => c.CourseFormComponent), resolve: { course: courseResolver}
  },
  {
        path:'edit/:id', loadComponent:() => import('./courses/containers/courses/course-form/course-form.component').then(c => c.CourseFormComponent), resolve: { course: courseResolver}
  }

];
