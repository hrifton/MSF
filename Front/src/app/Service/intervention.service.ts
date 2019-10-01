import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import Intervention from "../Class/Intervention";

@Injectable({ providedIn: "root" })
export class InterventionService {
  uri = "/api/intervention";

  constructor(private http: HttpClient) {}
  // add a new Intervention
  postInter(intervention: Intervention) {
    return this.http.post(`${this.uri}/add`, intervention);
  }

  // Get All Intervention
  getInterventions() {
    return this.http.get(`${this.uri}`);
  }
  // Get Interventions byUser
  getInterventionsByUser(fullName) {
    return this.http.get(`${this.uri}/ByUser/`, { params: { fullName } });
  }
  // Get Interventions byUser
  getInterventionsBytech(fullName: any) {
    return this.http.get(`${this.uri}/ByTech/`, { params: { fullName } });
  }

  updateIntervention(form) {
    return this.http.put(`${this.uri}/${form.id}`, form);
  }
}
