import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Hospital } from '../Class/Hospital';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class HopitalService {
  uri = '/api/hospital';

  // tslint:disable-next-line: deprecation
  constructor(private http: HttpClient, private httpApi: Http) {}
  private apiurl = 'https://restcountries.eu/rest/v2/all';
  /**
   * return all country in API RestCountries.eu
   */
  getCountry() {
    return this.httpApi.get(`${this.apiurl}`).map(res => res.json());
  }

  getHospital() {
    return this.http.get(`${this.uri}`);
  }
  findHopital(id){
    return this.http.get(`${this.uri}/id/`, { params: { id } });
  }

  PostNewHospital(hospital: Hospital) {
    const obj = hospital;
    return this.http.post(`${this.uri}/add`, obj);
  }
}
