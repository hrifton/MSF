import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import Intervention from '../intervention/Intervention';


@Injectable({providedIn: 'root'})
export class InterventionService {

    uri = 'http://localhost:3000/api/intervention';

    selectedIntervention:Intervention={
      departement: '',
      locality: '',
       priority: '',
        day:'',
        description: '',
        status:'en_cours'
    }


    constructor(private http: HttpClient) {

    }
    //add a new Intervention
    postInter(intervention: Intervention){

      return this.http.post(`${this.uri}/add`, intervention).subscribe(data=>{
        console.log(data)
      },err=>{
        console.log("Error" + err);
      });
    }

    //Get All Intervention
    getInterventions() {
      return this.http.get(`${this.uri}`);
    }

   updateIntervention(departement, locality, priority, day, description, status, type, id) {
    const techn = 'Rudy';
    const obj = {
		departement,
		locality,
		priority,
		day,
		description,
		status,
    type,
    id,
    tech: techn,
      };

    this
      .http
      .put(`${this.uri}/update/${id}`, obj)
      .subscribe(res => console.log('Done'));
  }

}
