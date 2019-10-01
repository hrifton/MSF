import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categorie } from '../Class/Categorie';

@Injectable({
  providedIn: "root"
})
export class CategorieService {
  
  uri = "/api/categorie";

  constructor(private http: HttpClient) {}

  getCategorieByMetier( categorie: any){
    
    console.log(categorie._id)
    //const id = categorie._id;
    //console.log(id)
    //return this.http.get(`${this.uri}/metiercategorie/${categorie._id}`)
  }
}
