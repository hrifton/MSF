import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import {of} from 'rxjs';
@Injectable({providedIn: 'root'})

export class MetierService {
    uri = 'http://localhost:4000/metier';

    constructor(private http: HttpClient) {}
    // Insert a new metier
    addMetier(metier) {
        const obj = {
            metier
        };

        return this
            .http
            .post(`${this.uri}/add`, obj)
            .pipe(map(res => (res)), catchError(err => {
                console.error(err);
                return of(null);
            }));
    }

    // return all metier in Mongodb
    getMetiers() {
        return this
            .http
            .get(`${this.uri}`);
    }

    // return a metier
    getMetier(metier) {
    }

    // Update a metier
    updateMetier(metier, id) {
      const obj = {metier, id};
      this.http.put(`${this.uri}/update/${id}`, obj).subscribe(res => console.log('OK update'));
    }
}
