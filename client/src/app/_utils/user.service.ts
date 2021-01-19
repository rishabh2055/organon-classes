import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  addNewUser(postData){
    return this.http.post(`/api/user/add`, postData);
  }

  getAllUsers(): Observable<any>{
    return this.http.get<Observable<any>>(`/api/user/all`);
  }
  getUser(id): Observable<any> {
    return this.http.get<Observable<any>>(`/api/user/${id}`);
  }

  deleteUser(id): Observable<any> {
    return this.http.get<Observable<any>>(`/api/user/delete/${id}`);
  }
}
