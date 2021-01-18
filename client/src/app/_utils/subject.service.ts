import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }

  addNewSubject(postData){
    return this.http.post(`/api/subject/add`, postData);
  }

  getAllSubjects(): Observable<any>{
    return this.http.get<Observable<any>>(`/api/subject/all`);
  }
  getAllSubjectList(stream): Observable<any>{
    return this.http.get<Observable<any>>(`/api/subject/list/${stream.id}`);
  }
  getSubject(id): Observable<any> {
    return this.http.get<Observable<any>>(`/api/subject/${id}`);
  }

  deleteSubject(id): Observable<any> {
    return this.http.get<Observable<any>>(`/api/subject/delete/${id}`);
  }
}
