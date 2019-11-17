import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/map";
import { catchError, map } from "rxjs/operators";
import { of, BehaviorSubject, Observable } from "rxjs";
import { Hospital } from "../Class/Hospital";
import { response } from "express";
import { UserService } from './user.service';
import { User } from '../Class/user';
import { environment } from "../../environments/environment";
const INIT_Hop=[];
const INIT_List_Hop=[];
@Injectable({
  providedIn: "root"
})
export class HopitalService {
  uri = environment.apiBaseUrl + "/hospital";

  //public listeHospital = new BehaviorSubject(INIT_List_Hop);

  //public hospital = new BehaviorSubject(INIT_Hop);

  constructor(
    private http: HttpClient,
    private httpApi: Http,
    private us: UserService
  ) {}
  private apiurl = "https://restcountries.eu/rest/v2/all";
  /**
   * return all country in API RestCountries.eu
   */
  //#region Hopital
  /**getCountry()
   * get all Country in apiResCountries.eu
   */
  getCountry() {
    return this.httpApi.get(`${this.apiurl}`).map(res => res.json());
  }
  /**PostNewHospital(hospital: Hospital)
   *
   * @param hospital
   *
   * save a new Hospital
   *
   */
  async PostNewHospital(hospital: Hospital) {
    const obj = hospital;
    return await this.http.post(`${this.uri}/add`, obj).toPromise();
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
  //#endregion
  //#region maintenance
/**
 *add Maintenance in a Hosptial
 *
 * @param {*} $event
 * @returns
 * @memberof HopitalService
 */
AddMaintenanceToHosptial($event: any) {
    $event.idHospial = this.us.getIdHopital();
    return this.http.post(`${this.uri}/addmaintenance`, $event);
  }
/**
 *Add Maintenance Default
 *
 * @param {*} $event
 * @memberof HopitalService
 */
AddMaintenance($event: any) {
    return this.http.post(`${this.uri}/newmaintenance`, $event);
  }
  //#endregion
  //#region Metier
  /** addMetier(data: any)
   *
   * @param data
   * add new metier
   */
  addMetier(data: any) {
    data[0].idHopital = data.idHopital;

    return this.http.post(`${this.uri}/addmetier`, data);
  }

  /** rmMetier(data: any)
   *
   * @param data
   *
   * remove a Metier
   */
  rmMetier(data: any) {
    const obj = {
      idHopital: data.idHopital,
      idMetier: data[0]._id
    };
    return this.http.delete(
      `${this.uri}/delete/${obj.idHopital}/${obj.idMetier}`
    );
  }
  /**rmSub(data: any)
   * @param data
   * remove subMetier
   */
  rmSub(data: any) {
    return this.http.delete(
      `${this.uri}/delete/${data.idHopital}/${data.idMetier}/${data._id}`
    );
  }
  /**add a subMetier in a Hostpial
   *
   * @param data
   */
  addSubCatToHop(data: any) {
    console.log(data);
    //data[0].idHopital = data.idHopital;
    return this.http.post(`${this.uri}/addSubCat`, data);
  }
  //#endregion
  //#region User

  //#endregion user
  //#region For All component
  /**getHospital()
   * Get All Hospital
   */
  getHospital() {
    return this.http.get(`${this.uri}/hopital`);
  }
  /** findHopital()
   * Requset Get Find Hospital By id
   */
  findHopital(id) {
    return this.http.get(`${this.uri}/id/`, { params: { id } });
  }

  /**async getUserByHospital(id?: string)
   * @param id
   * Get All User By id Hospital
   *
   * if this.us.getIdHopital is undefined
   * var idHopital take id in param
   */
  getUserByHospital(id?: string) {
    let idHopital = this.us.getIdHopital();
    idHopital == "undefined" ? (idHopital = id) : "";
    console.log(idHopital);

    return this.http.get<User>(`${this.uri}/userbyhospital`, {
      params: { id }
    });
  }

  //#endregion
}
