import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import Solution from '../Class/Solution';

@Injectable({ providedIn: 'root'})
export class SolutionService {
  uri = 'http://localhost:3000/api/solution';


constructor(private http: HttpClient) { }
list:Solution[];
postSolution(data: any) {
const date = new Date();
const solution = new Solution();
solution.idIntervention = data.id ;
solution.solution =  data.solution ;
solution.date = date.toLocaleDateString();
solution.asset =  data.asset ;
solution.mat = data.useMat ;
solution.idTech = data.tech ;

return this.http.post(`${this.uri}/add`, solution).subscribe(data => {

}, err => {console.log('Error' + err);
});

}

getSolutionByIdIntervention(idIntervention) {
this.http.get(`${this.uri}/ByIntervention/`,{params:{idIntervention:idIntervention}})

}

}
