import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  addNewQuestion(postData){
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //    "Content-Type": "multipart/form-data"
    //   })
    // };
    return this.http.post(`/api/question/add`, postData);
  }

  getAllQuestions(): Observable<any>{
    return this.http.get<Observable<any>>(`/api/question/all`);
  }
  getAllQuestionList(topic): Observable<any>{
    return this.http.get<Observable<any>>(`/api/question/list/${topic.id}`);
  }
  getQuestion(id): Observable<any> {
    return this.http.get<Observable<any>>(`/api/question/${id}`);
  }

  deleteQuestion(id): Observable<any> {
    return this.http.get<Observable<any>>(`/api/question/delete/${id}`);
  }
}
