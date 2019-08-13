import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GridAllModule } from "@syncfusion/ej2-angular-grids";
import { HospitalRoutingModule } from "./hospital-routing.module";
import { ListHospitalComponent } from "./list-hospital/list-hospital.component";
import { FormHopitalComponent } from "./form-hopital/form-hopital.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DropDownListAllModule } from "@syncfusion/ej2-angular-dropdowns";
import { HospitalComponent } from './hospital.component';

@NgModule({
  declarations: [
   HospitalComponent,
    ListHospitalComponent,
    FormHopitalComponent
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
