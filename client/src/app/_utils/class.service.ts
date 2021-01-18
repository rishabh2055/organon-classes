import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(private http: HttpClient) { }

  addNewClass(postData){
    return this.http.post(`/api/class/add`, postData);
  }

  getAllClasses(): Observable<any>{
    return this.http.get<Observable<any>>(`/api/class/all`);
  }
  getClass(id): Observable<any> {
    return this.http.get<Observable<any>>(`/api/class/${id}`);
  }

  deleteClass(id): Observable<any> {
    return this.http.get<Observable<any>>(`/api/class/delete/${id}`);
  }
}
