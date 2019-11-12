import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import Intervention from "../Class/Intervention";
import { UserService } from "./user.service";
import Departement from '../Class/Departement';
import { environment } from "../../environments/environment";

@Injectable({ providedIn: "root" })
export class InterventionService {
  uri = environment.apiBaseUrl+"/intervention";

  constructor(private http: HttpClient, private us: UserService) {}
  // add a new Intervention

  postInter(intervention: Intervention) {
    return this.http.post(`${this.uri}/add`, intervention);
  }

  // Get All Intervention
  // TODO il faut ajouter par Hopital au minimum
  // TODO GET INTERVENTION 5 type SUPER ADMIN, Local ADMIN OPERATOR, TECH,USER

  // TODO SUPER ADMIN

  // TODO Local ADMIN OPERATOR
  getInterventions() {
    const idHopital = this.us.getIdHopital();

    return this.http.get(`${this.uri}/byHopital`, { params: { idHopital } });
  }
  // TODO TECH
  // Get Interventions byUser
  getInterventionsBytech(fullName: any) {
    return this.http.get(`${this.uri}/ByTech/`, { params: { fullName } });
  }
  // TODO USER
  // Get Interventions byUser
  getInterventionsByUser() {
    let idDepartement: any = [];
    idDepartement = JSON.stringify(this.us.getIdDepartement());
    const idHopital = this.us.getIdHopital();
    const idUser = this.us.getId();
    return this.http.get(`${this.uri}/ByUser/`, {
      params: { idDepartement, idHopital, idUser }
    });
  }

  updateIntervention(form) {
    console.log(form);
    return this.http.put(`${this.uri}/${form._id}`, form);
  }
}
