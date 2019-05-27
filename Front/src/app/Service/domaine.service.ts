import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DomaineService {
  uri = 'http://localhost:3000/api/domaine';

constructor(private http:HttpClient) { }

getAll(){
  return this.http.get(`${this.uri}`);
}


}
