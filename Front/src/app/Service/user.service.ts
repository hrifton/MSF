import { environment } from "./../../environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHandler, HttpHeaders } from "@angular/common/http";
import * as jwt_decode from "jwt-decode";
import { User } from "../Class/user";

@Injectable({
  providedIn: "root"
})
export class UserService {
  uri = "/api";
 
  noAuthHeader = { headers: new HttpHeaders({ NoAtuh: "True" }) };
  selectedUser: { fullName: string; email: string; password: string; };
  constructor(private http: HttpClient) {}

  /**
   *
   *Create a new User
   * @param {User} user
   * @returns code request
   * @memberof UserService
   */
  postUser(user: User) {
    return this.http.post(this.uri + "/register", user, this.noAuthHeader);
  }


  login(authCredentials) {
    return this.http.post(
      this.uri + "/authenticate",
      authCredentials,
      this.noAuthHeader
    );
  }
  /**
   * DecodeToken et assigne 
   * le status fullname email 
   * de l'utilisateur
   * @param {string} token
   * @memberof UserService
   */
  getDecodedAccessToken(token: string): any {
    try {
      let jwt = jwt_decode(token);
      this.setStatus(jwt.status);
      this.setFullName(jwt.fullName);
      this.setEmail(jwt.email);
     
    } catch (Error) {
      return(Error);
    }
  }
  
  /**
   
   * @memberof UserService
   */
  getUserProfil() {
    return this.http.get(this.uri + "/userProfil");
  }
  /**
   *
   *
   * @returns
   * @memberof UserService
   */
  getUserTech() {
    return this.http.get(this.uri + "/techs");
  }

  /**
   *
   *
   * @param {*} fullName
   * @memberof UserService
   */
  setFullName(fullName) {
    localStorage.setItem("fullName", fullName);
  }
  /**
   *
   *
   * @returns
   * @memberof UserService
   */
  getFullName() {
    return localStorage.getItem("fullName");
  }
  /**
   *
   *
   * @param {string} arg0
   * @memberof UserService
   */
  deleteFullName(arg0: string) {
    localStorage.removeItem("fullName");
  }
  /**
   *
   *
   * @param {*} email
   * @memberof UserService
   */
  setEmail(email) {
    localStorage.setItem("email", email);
  }
  getEmail() {
    return localStorage.getItem("email");
  }
  deleteEmail(arg0: string) {
    localStorage.removeItem("email");
  }
  setStatus(status) {
    localStorage.setItem("status", status);
  }
  getStatus() {
    return localStorage.getItem("status");
  }
  deleteStatus(arg0: string) {
    localStorage.removeItem("status");
  }

  setToken(token: string) {
    localStorage.setItem("token", token);
    this.getDecodedAccessToken(localStorage.token);
  }
  getToken() {
    return localStorage.getItem("token");
  }
  deleteToken() {
    localStorage.removeItem("token");
    this.deleteFullName("fullname");
    this.deleteStatus("status");
    this.deleteEmail("email");
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPlayoad = atob(token.split(".")[1]);
      return JSON.parse(userPlayoad);
    } else {
      return null;
    }
  }

  isLoginIn() {
    var userPlayload = this.getUserPayload();
    if (userPlayload) {
      return userPlayload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }
}
