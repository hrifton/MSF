import { Maintenance } from './../Class/Maintenance';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {
  uri = 'http://localhost:3000/api/maintenance';
  constructor(private http: HttpClient) { }

  //getAll Maintenance


  getMaintenance() {
    return this.http.get(`${this.uri}`);
  }
  

}
