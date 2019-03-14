import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class InterventionService {
    uri = 'http://localhost:4000/intervention';

    constructor(private http : HttpClient) {}

    addIntervention(departement, locality, priority, day, description) {
        const obj = {
            departement: departement,
            locality: locality,
            priority: priority,
            day: day,
            description: description,
            status: 'en_cours'
        };
        console.log(`${this.uri}/add`, obj);

        this.http.post(`${this.uri}/add`, obj).subscribe(res => console.log(res));
    }

    getInterventions(){
      return this.http.get(`${this.uri}`);
    }

}
