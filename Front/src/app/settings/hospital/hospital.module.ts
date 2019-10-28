import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GridAllModule } from "@syncfusion/ej2-angular-grids";

import { HospitalRoutingModule } from "./hospital-routing.module";

import { HospitalComponent } from './hospital.component';
import { ListHospitalComponent } from "./list-hospital/list-hospital.component";
import { FormHopitalComponent } from "./form-hopital/form-hopital.component";
import { MetierHopitalComponent } from './metier-hopital/metier-hopital.component';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DropDownListAllModule } from "@syncfusion/ej2-angular-dropdowns";
import { DepartementHopitalComponent } from './departement-hopital/departement-hopital.component';



@NgModule({
  declarations: [
    HospitalComponent,
    ListHospitalComponent,
    FormHopitalComponent,
    MetierHopitalComponent,
    DepartementHopitalComponent
  ],
  imports: [
    CommonModule,
    HospitalRoutingModule,
    GridAllModule,
    FormsModule,
    ReactiveFormsModule,
    DropDownListAllModule
  ],
  exports: [HospitalComponent]
})
export class HospitalModule {}
