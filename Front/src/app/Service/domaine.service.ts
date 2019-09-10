import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DomaineService {
  uri = '/api/domaine';

constructor(private http:HttpClient) { }

getAll(){
  return this.http.get(`${this.uri}`);
}


}
