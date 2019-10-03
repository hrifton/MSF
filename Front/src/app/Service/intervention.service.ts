import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import Intervention from "../Class/Intervention";
import { UserService } from "./user.service";

@Injectable({ providedIn: "root" })
export class InterventionService {
  uri = "/api/intervention";
  /*
  selectedIntervention: Intervention = {
    departement: "",
    locality: "",
    priority: "",
    day: "",
    description: "",
    status: "en_cours",
    user: "",
    type: "",
    tech: ""
  };
*/
  constructor(private http: HttpClient, private us: UserService) {}
  // add a new Intervention

  postInter(intervention: Intervention) {
    return this.http.post(`${this.uri}/add`, intervention);
  }

  // Get All Intervention
  //TODO il faut ajouter par Hopital au minimum

  //TODO GET INTERVENTION 5 type SUPER ADMIN, Local ADMIN OPERATOR, TECH,USER

  //TODO SUPER ADMIN

  //TODO Local ADMIN OPERATOR

  //TODO TECH

  //TODO USER
  // Get Interventions byUser
  getInterventionsByUser() {
    const idDepartement = this.us.getIdDepartement();
    const idHopital = this.us.getIdHopital();
    const idUser = this.us.getId();
    return this.http.get(`${this.uri}/ByUser/`, {
      params: { idDepartement, idHopital, idUser }
    });
  }

  getInterventions() {
    return this.http.get(`${this.uri}`);
  }

  // Get Interventions byUser
  getInterventionsBytech(fullName: any) {
    return this.http.get(`${this.uri}/ByTech/`, { params: { fullName } });
  }

  updateIntervention(form) {
    return this.http.put(`${this.uri}/${form.id}`, form);
  }
}
