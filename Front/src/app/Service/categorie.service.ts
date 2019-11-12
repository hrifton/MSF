import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Categorie } from "../Class/Categorie";
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: "root"
})
export class CategorieService {
  uri = environment.apiBaseUrl+'/categorie';

  constructor(private http: HttpClient) {}

  getCategorieByMetier(categorie: any) {
    console.log(categorie);
    //const id = categorie._id;
    //console.log(id)
    //return this.http.get(`${this.uri}/metiercategorie/${categorie._id}`)
  }
  AddCategorie(categorie: Categorie) {
    console.log(" service categorie : ", categorie);
    return this.http.post(`${this.uri}/add`, categorie);
  }
}
