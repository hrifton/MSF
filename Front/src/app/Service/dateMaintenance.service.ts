import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DateMaintenance } from '../Class/DateMaintenance';
import { Maintenance } from '../Class/Maintenance';

@Injectable({
  providedIn: 'root'
})
export class DateMaintenanceService {
  uri = 'http://localhost:3000/api/datemaintenance';

  constructor(private http: HttpClient) {}
// Post a new datemaintenance
  postDateMaintenance(datemaintenance: DateMaintenance) {
    
    return this.http.post(`${this.uri}/add`, datemaintenance).subscribe(
      data => {
        //console.log(data);
      },
      err => {
        //console.log('Erro' + err);
      }
    );
  }

// Get all datemaintenance
getDateMaintenance() {
  return this.http.get(`${this.uri}`);
}
}
