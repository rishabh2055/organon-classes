import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StreamService {

  constructor(private http: HttpClient) { }

  addNewStream(postData){
    return this.http.post(`/api/stream/add`, postData);
  }

  getAllStreams(): Observable<any>{
    return this.http.get<Observable<any>>(`/api/stream/all`);
  }
  getAllStreamList(classValue): Observable<any>{
    return this.http.get<Observable<any>>(`/api/stream/list/${classValue.id}`);
  }
  getStream(id): Observable<any> {
    return this.http.get<Observable<any>>(`/api/stream/${id}`);
  }

  deleteStream(id): Observable<any> {
    return this.http.get<Observable<any>>(`/api/stream/delete/${id}`);
  }
}
