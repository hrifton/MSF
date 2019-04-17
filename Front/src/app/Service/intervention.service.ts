import {Injectable} from '@angular/core';
import {HttpClient,HttpParams} from '@angular/common/http';

import Intervention from '../intervention/Intervention';


@Injectable({providedIn: 'root'})
export class InterventionService {


    uri = 'http://localhost:3000/api/intervention';

    selectedIntervention: Intervention = {
      departement: '',
      locality: '',
       priority: '',
        day: '',
        description: '',
        status: 'en_cours',
        user: ''
    };


    constructor(private http: HttpClient) {

    }
    // add a new Intervention
    postInter(intervention: Intervention) {
    console.log(intervention);
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
    //Get Interventions byUser
    getInterventionsByUser(fullName) {
      return this.http.get(`${this.uri}/ByUser/`,{params:{fullName:fullName}})
    }
    //Get Interventions byUser
    getInterventionsBytech(fullName: any) {
      return this.http.get(`${this.uri}/ByTech/`,{params:{fullName:fullName}})
    }


   updateIntervention(form) {
   console.log(form);

    this
      .http
      .put(`${this.uri}/${form.id}`, form)
      .subscribe(res => console.log('Done'));
  }

}
