import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})

export class DepartementService {

    uri = 'http://localhost:4000/departement';

    constructor(private http : HttpClient) {}

    addDeparement(departement) {

        const obj = {
            departement
        };

        if (this.getDepartement == null) {}

        this
            .http
            .post(`${this.uri}/add`, obj)
            .subscribe(res => console.log(res));
    }

    getDepartement(departement) {

        this
            .http
            .get(`${this.uri}/edit/${departement}`)
            .subscribe(res => console.log(res));
    }
    getDepartements() {
        return this
            .http
            .get(`${this.uri}`);
    }
}
