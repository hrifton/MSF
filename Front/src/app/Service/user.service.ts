import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from "@angular/common/http";

import { User } from '../Class/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
selectedUser:User ={
  fullName:'',
  email:'',
  password:''
};
noAuthHeader={ headers: new HttpHeaders({'NoAtuh':'True'})};
  constructor(private http:HttpClient) { }

  postUser(user:User) {
    return this.http.post(environment.apiBaseUrl+'/register',user,this.noAuthHeader);
  }

  login(authCredentials) {
    return this.http.post(environment.apiBaseUrl+'/authenticate',authCredentials,this.noAuthHeader);
  }
  getUserProfil(){
    return this.http.get(environment.apiBaseUrl+'/userProfil');
  }
  getUserTech(){
    return this.http.get(environment.apiBaseUrl+'/techs');
  }




  setToken(token:string) {
    localStorage.setItem('token',token);
  }
  getToken(){
   return localStorage.getItem('token')
  }

  deleteToken() {
    localStorage.removeItem('token');
  }


  getUserPayload() {
    var token = this.getToken();
    if(token) {
      var userPlayoad=atob(token.split('.')[1]);
      return JSON.parse(userPlayoad);
    } else {return null}
  }

  isLoginIn() {
    var userPlayload =this.getUserPayload();
    if( userPlayload) {
    return userPlayload.exp > Date.now() / 1000;
    } else { return false; }
  }
}
