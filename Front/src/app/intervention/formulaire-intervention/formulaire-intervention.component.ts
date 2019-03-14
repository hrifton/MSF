import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InterventionService } from '../intervention.service'
@Component({
  selector: 'app-formulaire-intervention',
  templateUrl: './formulaire-intervention.component.html',
  styleUrls: ['./formulaire-intervention.component.css']
})
export class FormulaireInterventionComponent implements OnInit {

  today = new Date();

  angForm: FormGroup;
  breakpoint: number;

  constructor(private fb: FormBuilder, private is: InterventionService) {
    this.createForm();

  }

  createForm(){
    this.angForm = this.fb.group({
      departement: [ '', Validators.required ],
      locality: [ '', Validators.required ],
      priority: [ '', Validators.required ],
      date: [ '', Validators.required ],
      description: [ '', Validators.required ]
    });
  }



  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 1000) ? 1 : 4;
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 1000) ? 1 : 4;
  }

  addIntervention(departement, locality, priority, day, description){
    this.is.addIntervention(departement, locality, priority, day, description);


  }
}
