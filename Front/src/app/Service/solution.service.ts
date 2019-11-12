import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import Solution from "../Class/Solution";
import { environment } from "../../environments/environment";
@Injectable({ providedIn: "root" })
export class SolutionService {
  uri = environment.apiBaseUrl+'/solution';

  constructor(private http: HttpClient) {}
  list: Solution[];

  postSolution(data: any) {
    return this.http.post(`${this.uri}/addClose`, data);
  }
  postSolutionWaiting(data: any) {
    return this.http.post(`${this.uri}/addWaiting`, data);
  }

  getSolutionByIdIntervention(idIntervention) {
    return this.http
      .get(`${this.uri}/ByIntervention/${idIntervention}`)
      .subscribe(res => console.log(res));
  }
}
