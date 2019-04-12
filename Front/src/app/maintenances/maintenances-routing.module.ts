import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaintenancesComponent } from './maintenances.component';


const routes: Routes = [
  {
    path: 'maintenance',
    component: MaintenancesComponent,
    children: [
      { path: '', component: MaintenancesComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenancesRoutingModule { }
