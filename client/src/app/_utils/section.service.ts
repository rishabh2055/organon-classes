import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  constructor(private http: HttpClient) { }

  addNewSection(postData){
    return this.http.post(`/api/section/add`, postData);
  }

  getAllSections(): Observable<any>{
    return this.http.get<Observable<any>>(`/api/section/all`);
  }
  getAllSectionList(topic): Observable<any>{
    return this.http.get<Observable<any>>(`/api/section/list/${topic.id}`);
  }
  getSection(id): Observable<any> {
    return this.http.get<Observable<any>>(`/api/section/${id}`);
  }

  deleteSection(id): Observable<any> {
    return this.http.get<Observable<any>>(`/api/section/delete/${id}`);
  }
}
