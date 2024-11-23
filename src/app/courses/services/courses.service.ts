import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, tap } from 'rxjs';

import { Courses } from '../model/courses'
import { CoursePage } from '../model/course-page';


@Injectable({
  providedIn: 'root',
})
export class CoursesService {

  private readonly API = 'api/courses';


  constructor(private httpClient: HttpClient) {}

  list( page=0, pageSize=5){
    return this.httpClient.get<CoursePage>(this.API, {params:{page, pageSize}})
    .pipe(
      first(),
      delay(2000),
      tap(res => console.log(res))
    );
  }

  loadById(id: string){
   return this.httpClient.get<Courses>(`${this.API}/${id}`);
  }

  save(record: Courses){
    console.log(record)
    if(record._id){
      console.log('update')
      return this.update(record);

    }
    console.log('create')
    return this.create(record);
  }
  private create(record: Courses){
    return this.httpClient.post<Courses>(this.API, record);
  }
  private update(record: Courses){
    return this.httpClient.put<Courses>(`${this.API}/${record._id}`, record);
  }
  public delete(id: string){
    return this.httpClient.delete<Courses>(`${this.API}/${id}`);
  }
}
