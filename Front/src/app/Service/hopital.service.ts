import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http,Response } from '@angular/http';
import "rxjs/add/operator/map";
import {catchError, map} from 'rxjs/operators';
import {of} from 'rxjs';
import { Hospital } from '../Class/Hospital';

@Injectable({
  providedIn: 'root'
})
export class HopitalService {
  
  uri = '/api/hopital';
  
 

constructor(private httpClient:HttpClient,private http:Http){}
private apiurl="https://restcountries.eu/rest/v2/all";
/**
 * return all country in API RestCountries.eu
 */
 getCountry(){
  return this.http.get(`${this.apiurl}`).map(res=>res.json());
  }
PostNewHospital(hospital: Hospital) {
  return this
  .http
  .post(`${this.uri}/add`, hospital['value'])
  .pipe(map(res => (res)), catchError(err => {
      console.error(err);
      return of(null);
  }));
  }
}
