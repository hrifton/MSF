import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class AssetService {
  uri = environment.apiBaseUrl+'/asset';

  constructor(private http: HttpClient) {}
  // Post a new datemaintenance

  sendFile(file: any) {
    console.log(file);
    return this.http.post(`${this.uri}/add`, file).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log("Erro" + err);
      }
    );
  }
  /**
   *
   * @param data
   * @returns liste des solutions d'un asset
   */
  findInterSolByAsset(data): Observable<any> {
    return this.http.get(`${this.uri}/inter/${data}`);
  }
}
