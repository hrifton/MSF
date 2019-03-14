import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn:'root'})

export class DepartementService{

  uri= 'http://localhost:4000/departement';

  constructor(private http : HttpClient){}

  addDeparement(deparement){

    const obj = {
      departement: deparement
    };

      console.log(`${this.uri}/add`, obj);
      this.http.post(`${this.uri}/add`, obj).subscribe(res => console.log(res));
  }

  getDepartements(){
    return this.http.get(`${this.uri}`);
  }
}
