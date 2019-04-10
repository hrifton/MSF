import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class InterventionService {
    uri = 'http://localhost:4000/intervention';

    constructor(private http: HttpClient) {

    }

    addIntervention(departement, locality, priority, day, description) {
        const obj = {
            departement,
            locality,
            priority,
            day,
            description,
            status: 'en_cours',
            type: 'JobRequest'
        };
        console.log(`${this.uri}/add`, obj);

        this.http.post(`${this.uri}/add`, obj).subscribe(res => console.log(res));
    }

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
