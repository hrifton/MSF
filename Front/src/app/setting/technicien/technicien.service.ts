import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable({providedIn: 'root'})

export class TechnicienService {

    uri = 'http://localhost:4000/technicien';

    constructor(private http: HttpClient) {}

    addTechnicien(data) {
        const obj = {
            data
        };

        return this
            .http
            .post(`${this.uri}/add`, obj)
            .pipe(map(res => (res)), catchError(err => {
                console.error(err);
                return of(null);
            }));
    }

}
