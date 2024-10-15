import { Routes } from '@angular/router';


export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo:'courses' },
  {
    path:'courses', loadComponent:() => import('./courses/containers/courses/courses.component').then(c => c.CoursesComponent)
  },{
    path:'new', loadComponent:() => import('./courses/containers/courses/course-form/course-form.component').then(c => c.CourseFormComponent)
  }


];
