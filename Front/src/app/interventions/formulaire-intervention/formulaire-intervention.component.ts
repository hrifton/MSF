import { DepartementService } from '../../Service/departement.service';
import { Component, OnInit } from '@angular/core';
import Departement from 'src/app/setting/departement/Departement';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { InterventionService } from 'src/app/intervention/intervention.service';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-formulaire-intervention',
  templateUrl: './formulaire-intervention.component.html',
  styleUrls: ['./formulaire-intervention.component.scss']
})
export class FormulaireInterventionComponent implements OnInit {

  today = new Date();
  departements: Departement[];

  angForm: FormGroup;
  breakpoint: number;

  constructor(private fb: FormBuilder, private is: InterventionService, private ds: DepartementService, private toastr: ToastrService) {
    this.createForm();

  }
  createForm() {
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
    this.ds.getDepartements().subscribe((data: Departement[]) => {
      this.departements = data;

    });
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 1000) ? 1 : 4;
  }


  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
  addIntervention(departement, locality, priority, day, description) {
        this.showSuccess();
        this.is.addIntervention(departement, locality, priority, day, description);


  }

}
