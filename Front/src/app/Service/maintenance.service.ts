import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Maintenance } from '../Class/Maintenance';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class MaintenanceService {
  AddMaintenance($event: any) {
    throw new Error("Method not implemented.");
  }
  uri = environment.apiBaseUrl + "/maintenance";
  constructor(private http: HttpClient) {}

  // getAll Maintenance

  getMaintenance() {
    return this.http.get(`${this.uri}/maintenance`);
  }
  PostNewMaintenance(maintenance: Maintenance) {
    return this.http.post(`${this.uri}/add`, maintenance);
  }

}
