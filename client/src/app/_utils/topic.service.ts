import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  constructor(private http: HttpClient) { }

  addNewTopic(postData){
    return this.http.post(`/api/topic/add`, postData);
  }

  getAllTopics(): Observable<any>{
    return this.http.get<Observable<any>>(`/api/topic/all`);
  }
  getAllTopicList(subject): Observable<any>{
    return this.http.get<Observable<any>>(`/api/topic/list/${subject.id}`);
  }
  getAllTopicListByClassAndStream(student): Observable<any>{
    return this.http.post<Observable<any>>(`/api/topic/byClassAndStream`, student);
  }
  getTopic(id): Observable<any> {
    return this.http.get<Observable<any>>(`/api/topic/${id}`);
  }

  deleteTopic(id): Observable<any> {
    return this.http.get<Observable<any>>(`/api/topic/delete/${id}`);
  }
}
