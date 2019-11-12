import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map } from "rxjs/operators";
import { of } from "rxjs";
import Departement from '../Class/Departement';
import { environment } from "../../environments/environment";
@Injectable({ providedIn: "root" })
export class DepartementService {
  uri = environment.apiBaseUrl+'/departement';

  constructor(private http: HttpClient) {}

  addDeparement(departement) {
    const obj = {
      departement
    };

    return this.http.post(`${this.uri}/add`, obj).pipe(
      map(res => res),
      catchError(err => {
        console.error(err);
        return of(null);
      })
    );
  }

  getDepartement(departement) {
    return this.http
      .get(`${this.uri}/edit/${departement}`)
      .subscribe(res => console.log(res));
  }
  getDepartements() {
    return this.http.get<Departement>(`${this.uri}/departement`);
  }
}
