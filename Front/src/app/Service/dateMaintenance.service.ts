import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DateMaintenance } from '../Class/DateMaintenance';
import { Maintenance } from '../Class/Maintenance';

@Injectable({
  providedIn: 'root'
})
export class DateMaintenanceService {
  uri = '/api/datemaintenance';

  constructor(private http: HttpClient) { }
  // Post a new datemaintenance
  postDateMaintenance(datemaintenance: DateMaintenance) {
    console.log(datemaintenance)
    return this.http.post(`${this.uri}/add`, datemaintenance).subscribe(
      data => {
        // console.log(data);
      },
      err => {
        // console.log('Erro' + err);
      }
    );
  }

  deleteDateMaintenance(datemaintenance) {
    const id = datemaintenance.event._id;
    console.log('deleteDateMaintenance ' + id);
    return this.http.delete(`${this.uri}/${id}`).subscribe(data => {
      console.log(data);
    },
      err => {
        console.log(err);
      }

    );
  }
  deleteSerieDateMaintenance(datemaintenance) {
    const id = datemaintenance.event.idMaintenance;
    const codeBarre = datemaintenance.event.codeBarre;

    return this.http.delete(`${this.uri}/delete/${id}/${codeBarre}`).toPromise().then((response) => response);
  }

  // Get all datemaintenance
  getDateMaintenance() {
    return this.http.get(`${this.uri}`);
  }

  getMaintenanceAndIntervention() {
    return this.http.get(`${this.uri}/maintenancedate`);
  }

}
