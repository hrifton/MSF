import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map } from "rxjs/operators";
import { of } from "rxjs";
import Departement from '../Class/Departement';

@Injectable({ providedIn: "root" })
export class DepartementService {
  uri = "http://localhost:3000/api/departement";

  constructor(private http: HttpClient) { }

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
  async getDepartements() {
    return await this.http.get<Departement>(`${this.uri}/departement`).toPromise();
  }
}
