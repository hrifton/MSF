
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaintenancesComponent } from './maintenances.component';
import { FormulaireComponent } from './formulaire/formulaire.component';
import { CalendrierComponent } from './calendrier/calendrier.component';
import { AuthGuard } from '../auth/auth.guard';


const routes: Routes = [
  {
    path: 'maintenance',
    component: MaintenancesComponent,
    children: [
      { path: '', component: MaintenancesComponent, canActivate: [AuthGuard] },
      { path: 'formMaintenance', component: FormulaireComponent },
      { path: 'agenda', component: CalendrierComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenancesRoutingModule { }
