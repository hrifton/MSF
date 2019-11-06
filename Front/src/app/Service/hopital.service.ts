import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/map";
import { catchError, map } from "rxjs/operators";
import { of } from "rxjs";
import { Hospital } from "../Class/Hospital";
import { response } from "express";
import { UserService } from './user.service';
import { User } from '../Class/user';

@Injectable({
  providedIn: "root"
})
export class HopitalService {
  uri = "http://localhost:3000/api/hospital";

  // tslint:disable-next-line: deprecation
  constructor(
    private http: HttpClient,
    private httpApi: Http,
    private us: UserService
  ) {}
  private apiurl = "https://restcountries.eu/rest/v2/all";
  /**
   * return all country in API RestCountries.eu
   */
  getCountry() {
    return this.httpApi.get(`${this.apiurl}`).map(res => res.json());
  }

  getHospital() {
    return this.http.get(`${this.uri}`);
  }
  async findHopital(id) {
    return await this.http.get<Hospital>(`${this.uri}/id/`, { params: { id } }).toPromise();
  }

  async getUserByHospital(id?: string) {
    let idHopital = this.us.getIdHopital();
    idHopital == "undefined" ? (idHopital = id) : "";
    console.log(idHopital);

    return await this.http
      .get<User>(`${this.uri}/userbyhospital`, { params: { id } })
      .toPromise();
  }

  PostNewHospital(hospital: Hospital) {
    const obj = hospital;
    return this.http.post(`${this.uri}/add`, obj);
  }

  addMetier(data: any) {
    data[0].idHopital = data.idHopital;

    return this.http.post(`${this.uri}/addmetier`, data);
  }

  rmMetier(data: any) {
    console.log("delete metier to liste Hopistal");
    const obj = {
      idHopital: data.idHopital,
      idMetier: data[0]._id
    };
    return this.http.delete(
      `${this.uri}/delete/${obj.idHopital}/${obj.idMetier}`
    );
  }

  rmSub(data: any) {
    console.log(data);
  }

  addSubCatToHop(data: any) {
    console.log(data);
    //data[0].idHopital = data.idHopital;
    return this.http.post(`${this.uri}/addSubCat`, data);
  }

  addDepToHop(data: any) {
    data[0].idHopital = data.idHopital;
    return this.http.post(`${this.uri}/addDep`, data);
  }
  delDepToHop(data: any) {
    console.log(data);
    return this.http.delete(
      `${this.uri}/delDep/${data.idHopital}/${data[0]._id}`
    );
  }
}
