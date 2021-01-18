import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  unAuthorizedError = '';
  constructor(
    private http: HttpClient
  ) {
    this.isLoggedIn.next(this.isAuthenticated());
   }

  authenticate(){
    return this.http.get<any>(`/api/user/authenticate`);
  }

  signout(){
    localStorage.clear();
    this.isLoggedIn.next(this.isAuthenticated());
    return this.http.get<any>(`/logout`);
  }

  setUnauthorizedError(){
    this.unAuthorizedError = 'Unauthorized access! Session expired.';
  }

  getUnauthorizedError(){
    return this.unAuthorizedError;
  }

  saveToken(token: string){
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  getToken(): string{
    return localStorage.getItem(TOKEN_KEY);
  }

  isAuthenticated(): boolean{
    return this.getToken() !== null;
  }

  saveUser(user){
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    this.isLoggedIn.next(this.isAuthenticated());
  }

  get isLoggedInDetails() {
    return this.isLoggedIn.asObservable();
  }

  getUser(){
    return JSON.parse(localStorage.getItem(USER_KEY));
  }
}
