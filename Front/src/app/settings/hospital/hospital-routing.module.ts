import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormHopitalComponent } from './form-hopital/form-hopital.component';
import { AuthGuard } from '../../auth/auth.guard';
import { ListHospitalComponent } from './list-hospital/list-hospital.component';

const routes: Routes = [
  { path: '', redirectTo: 'hospital', pathMatch: 'full', canActivate: [AuthGuard]},
  { path: 'formHospital', component: FormHopitalComponent },
  { path: 'listHospital', component: ListHospitalComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HospitalRoutingModule {}
