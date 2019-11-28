import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DateMaintenance } from "../Class/DateMaintenance";
import { Maintenance } from "../Class/Maintenance";
import { environment } from "../../environments/environment";
import { UserService } from "./user.service";
import * as moment from "moment";
@Injectable({
  providedIn: "root"
})
export class DateMaintenanceService {


  uri = environment.apiBaseUrl + "/datemaintenance";

  constructor(private http: HttpClient, private us: UserService) { }

  /**
   * add New Maintenance
   * @param  {DateMaintenance} datemaintenance
   */
  postDateMaintenance(datemaintenance: DateMaintenance) {
    return this.http.post(`${this.uri}/add`, datemaintenance).subscribe(
      data => {
        // console.log(data);
      },
      err => {
        // console.log('Erro' + err);
      }
    );
  }
  /**
   * delete a date Maintenance
   * @param  {} datemaintenance
   */
  deleteDateMaintenance(datemaintenance) {
    const id = datemaintenance.event._id;
    console.log("deleteDateMaintenance " + id);
    return this.http.delete(`${this.uri}/${id}`).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }
  /**
   * delete date Maintenance By _idMaintenance
   * @param  {} datemaintenance
   */
  deleteSerieDateMaintenance(datemaintenance) {
    const id = datemaintenance.event.idMaintenance;
    const codeBarre = datemaintenance.event.codeBarre;

    return this.http
      .delete(`${this.uri}/delete/${id}/${codeBarre}`)
      .toPromise()
      .then(response => response);
  }


  /**
   * return all Date Maintenance For a Hosptial
   */
  getDateMaintenance() {
    let idHopital = this.us.getIdHopital();
    return this.http.get(`${this.uri}/byHopital`, { params: { idHopital } });
  }

  /**
   * 
   */
  getMaintenanceAndIntervention() {
    return this.http.get(`${this.uri}/maintenancedate`);
  }
  /**
   * return all maintenance of month Current
   */
  getMaintenanceByHospitalAndDate() {
    const startOfMonth = moment()
      .startOf("month")
      .format("YYYY-MM-DD hh:mm");
    const endOfMonth = moment()
      .endOf("month")
      .format("YYYY-MM-DD hh:mm");
    let idHopital = this.us.getIdHopital();
    return this.http.get(`${this.uri}/MaintenanceByHospitalAndDate`, {
      params: { idHopital, startOfMonth, endOfMonth }
    });
  }
  /**
   * return maintenance by _idTech
   * @param  {string} idTech
   */
  getDateMaintenanceByTech(idTech: string) {
    return this.http.get(`${this.uri}/getDateMaintenanceByTech`, {
      params: { idTech }
    });
  }
  /**
   * Ajout de solution a la Date de Maintenance
   * @param $event 
   */
  addSolution($event: any) {
    return this.http.put(`${this.uri}/addsolution/${$event._id}`, $event);
  }
  /**
   * Update Date Maintenance (tech,date)
   * @param $event 
   */
  updateWithOutSolution($event: any) {
    return this.http.put(`${this.uri}/updatedatemaintenance/${$event._id}`, $event);
  }
}
