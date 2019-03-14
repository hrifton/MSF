import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DepartementService } from '../departement.service';

@Component({
  selector: 'app-setting-departement',
  templateUrl: './setting-departement.component.html',
  styleUrls: ['./setting-departement.component.scss']
})
export class SettingDepartementComponent implements OnInit {

  angForm: FormGroup;
  breakpoint: number;

  constructor(private fb: FormBuilder, private ds: DepartementService) {
    this.createForm();
   }

   //Creation du formulaire avec champ validation
   createForm(){
     this.angForm = this.fb.group({
       departement: [ '',Validators.required]
     });
   }




  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 1000) ? 1 : 4;
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 1000) ? 1 : 4;
  }


  addDepartement(departement){
    this.ds.addDeparement(departement);
  }

}
