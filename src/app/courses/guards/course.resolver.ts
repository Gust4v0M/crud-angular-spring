import { ActivatedRouteSnapshot, ResolveFn, Router, RouterStateSnapshot } from '@angular/router';
import { CoursesService } from '../services/courses.service';
import { inject } from '@angular/core';
import { Courses } from '../model/courses';
import { of } from 'rxjs';

export const courseResolver: ResolveFn<Courses> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

  const service: CoursesService = inject(CoursesService)

  const router: Router = inject(Router)
      if(route.params && route.params['id']){
      //console.log(route.params['id'])
      }
  return of({_id: '', nome: '', category: ''});
};
