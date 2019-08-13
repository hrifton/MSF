import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/map";
import { catchError, map } from "rxjs/operators";
import { of } from "rxjs";
import { Hospital } from "../Class/Hospital";

@Injectable({
  providedIn: "root"
})
export class HopitalService {
  uri = "/api/hospital";

  constructor(private http: HttpClient, private httpApi: Http) {}
  private apiurl = "https://restcountries.eu/rest/v2/all";
  /**
   * return all country in API RestCountries.eu
   */
  getCountry() {
    return this.httpApi.get(`${this.apiurl}`).map(res => res.json());
  }

  getHospital(){
   return this.http.get(`${this.uri}`)
  }

  PostNewHospital(hospital: Hospital) {
    let obj = hospital["value"];
    return this.http.post(`${this.uri}/add`, obj).subscribe(
      data => {},
      err => {
        console.log("Error" + err);
      }
    );
  }
}
