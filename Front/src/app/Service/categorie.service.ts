import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Categorie } from "../Class/Categorie";
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: "root"
})
export class CategorieService {
  uri = environment.apiBaseUrl + "/categorie";

  constructor(private http: HttpClient) {}

  /**
   * Add New Categorie
   * @param  {Categorie} categorie
   */
  AddCategorie(categorie: Categorie) {
    return this.http.post(`${this.uri}/add`, categorie);
  }
 
  /**
   * Delete Categorie
   * @param  {any} data
   */
  delSubCat(data: any) {
    console.log(data)
   return this.http.delete(`${this.uri}/del`, {params:data});
  }
}
