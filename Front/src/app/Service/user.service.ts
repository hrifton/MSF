import { Injectable } from "@angular/core";
import { HttpClient, HttpHandler, HttpHeaders } from "@angular/common/http";
import * as jwt_decode from "jwt-decode";
import { User } from "../Class/user";

@Injectable({
  providedIn: "root"
})
export class UserService {
  uri = "http://localhost:3000/api";

  noAuthHeader = { headers: new HttpHeaders({ NoAtuh: "True" }) };
  selectedUser: { fullName: string; email: string; password: string };

  constructor(private http: HttpClient) { }

  /**
   *
   *Create a new User
   * @param {User} user
   * @returns code request
   * @memberof UserService
   */
  postUser(user: User) {
    console.log(user);
    return this.http.post(this.uri + "/register", user, this.noAuthHeader);
  }

  login(authCredentials) {
    return this.http.post(
      this.uri + "/authenticate",
      authCredentials,
      this.noAuthHeader
    );
  }

  addDepartement($event: any) {
    console.log("addDepartement User", $event);
    return this.http.post(
      this.uri + "/addDepartement",
      $event,
      this.noAuthHeader
    );
  }
  remDepartement($event: any) {
    return this.http.delete(
      `${this.uri}/rmDepartementUser/${$event.idUser}/${$event._id}`
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
      const jwt = jwt_decode(token);
      this.setId(jwt._id);
      this.setStatus(jwt.status);
      this.setFullName(jwt.fullName);
      this.setEmail(jwt.email);
      this.setIdHopital(jwt.idHopital);
      this.setdepartements(jwt.departements);
    } catch (Error) {
      return Error;
    }
  }

  getToLocalStorage(token): any {
    this.deleteToken()
    token.id != undefined ? "" : token.id = token._id;
    token.mail != undefined ? token.email = token.mail : "";
    token.surname != undefined ? token.fullName = token.surname : "";
    console.log(token.length)
    try {
      this.setId(token.id);
      this.setStatus(token.status);
      this.setFullName(token.fullName);
      this.setEmail(token.email);
      this.setIdHopital(token.idHopital);
      this.setdepartements(token.departements);
    } catch (Error) {
      return Error;
    }
  }

  /**
   *
   *
   * @param {*} _id
   * @memberof UserService
   */
  setId(_id) {
    console.log("id :", _id)
    localStorage.setItem("_id", _id);
  }
  getId() {
    return localStorage.getItem("_id");
  }
  deleteId(arg0: string) {
    localStorage.removeItem("_id");
  }

  /**

   * @memberof UserService
   */
  async getUserProfil(user: any) {
    console.log(user)
    const fullName = user.fullName;
    const email = user.email
    const _id = user._id
    //return await this.http.get<User>(this.uri + "/", { params: { id } }).toPromise();
    return await this.http.get<User>(`${this.uri}/${_id}`, {
      params: { fullName, email, _id }
    }).toPromise();

  }
  /**
   *
   *
   * @returns
   * @memberof UserService
   */
  async getUserTech(idHopital) {

    return await this.http.get<User>(`${this.uri}/user/techsByHospital/`, {
      params: { idHopital }
    }).toPromise();
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
  deleteIdHopital(arg0: string) {
    localStorage.removeItem("idHopital");
  }
  setStatus(status) {
    localStorage.setItem("status", status);
  }
  getStatus() {
    return localStorage.getItem("status");
  }

  setIdHopital(idHopital) {
    localStorage.setItem("idHopital", idHopital);
  }
  getIdHopital() {
    return localStorage.getItem("idHopital");
  }
  deleteStatus(arg0: string) {
    localStorage.removeItem("status");
  }

  setdepartements(departement) {
    localStorage.setItem("departements", JSON.stringify(departement));
  }
  /**
   * Parse String TO Array[Object]
   */
  getIdDepartement() {
    var test = localStorage.getItem("departements");
    test = test.replace(/([a-zA-Z0-9]+?):/g, '"$1":');
    test = test.replace(/'/g, '"');
    test = JSON.parse(test);
    return test;
  }
  deleteIdDepartement(arg0: string) {
    localStorage.removeItem("departements");
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
    this.deleteId("_id");
    this.deleteFullName("fullname");
    this.deleteStatus("status");
    this.deleteEmail("email");
    this.deleteIdHopital("idHopital");
    this.deleteIdDepartement("IdDepartement");
  }

  getUserPayload() {
    const token = this.getToken();
    if (token) {
      const userPlayoad = atob(token.split(".")[1]);
      return JSON.parse(userPlayoad);
    } else {
      return null;
    }
  }

  isLoginIn() {
    const userPlayload = this.getUserPayload();
    if (userPlayload) {
      return userPlayload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  async getUserByHopital(args) {
    let test: any = [];
    test = await this.http.get(this.uri + "/userByHopital/:id", {
      params: { _id: args }
    });
    return test;
  }
}
