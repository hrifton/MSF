import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Solution from '../Class/Solution';

@Injectable({
  providedIn: 'root'
})
export class SolutionService {
  uri = 'http://localhost:3000/api/solution';


constructor(private http: HttpClient) { }

postSolution(data: any) {
let date = new Date();
const solution = new Solution();
solution.idIntervention = data.id ;
solution.solution =  data.solution ;
solution.date = date.toLocaleDateString();
solution.asset =  data.asset ;
solution.mat = data.useMat ;
console.log(solution);
return this.http.post(`${this.uri}/add`,solution).subscribe(data=>{
  console.log(data);
},err=>{console.log("Error"+err);
})

}

}
