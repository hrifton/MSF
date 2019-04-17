import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class InterventionService {
    uri = 'http://localhost:3000/intervention';

    constructor(private http: HttpClient) {

    }

    addIntervention(departement, locality, priority, day, description) {
      let result:Object;
      const obj = {
            departement,
            locality,
            priority,
            day,
            description,
            status: 'en_cours',
            type: 'JobRequest'
        };
        //this.http.post(`${this.uri}/add`, obj).subscribe(res => console.log(res));
      this.http.post(`${this.uri}/add`, obj).subscribe(response =>{console.log(response)})

      }

    getInterventions() {
      return this.http.get(`${this.uri}`);
    }

   updateIntervention(form:any) {
      console.log("******Update*******")
      console.log(form.id);

      this
      .http
      .put(`${this.uri}/update/${form.id}`, form)
      .subscribe(res => console.log('Done'));
  }



}
