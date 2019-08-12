import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import Intervention from '../Class/Intervention';


@Injectable({providedIn: 'root'})
export class InterventionService {


    uri = '/api/intervention';

    selectedIntervention: Intervention = {
      departement: '',
      locality: '',
       priority: '',
        day: '',
        description: '',
        status: 'en_cours',
        user: '',
        type: '',
        tech:''
    };


    constructor(private http: HttpClient) {  }
    // add a new Intervention
    postInter(intervention: Intervention) {
    return this.http.post(`${this.uri}/add`, intervention).subscribe(data => {
            console.log(data);
          }, err => {
            console.log('Error' + err);
          });
    }

    // Get All Intervention
    getInterventions() {
      return this.http.get(`${this.uri}`);
    }
    // Get Interventions byUser
    getInterventionsByUser(fullName) {
      return this.http.get(`${this.uri}/ByUser/`, {params: {fullName}});
    }
    // Get Interventions byUser
    getInterventionsBytech(fullName: any) {
      return this.http.get(`${this.uri}/ByTech/`, {params: {fullName}});
    }


   updateIntervention(form) {
console.log('updateIntervention')
    this
      .http
      .put(`${this.uri}/${form.id}`, form)
      .subscribe(res => console.log('Done'));
  }

}
