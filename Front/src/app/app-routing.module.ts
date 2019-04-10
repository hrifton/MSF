import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/*import { FormulaireInterventionComponent } from './intervention/formulaire-intervention/formulaire-intervention.component';
import { ListeInterventionComponent } from './intervention/liste-intervention/liste-intervention.component';
import { DepartementComponent } from './setting/departement/departement.component';
import { TechnicienComponent } from './setting/technicien/technicien.component';
import { CorpsDeMetierComponent } from './setting/corpsDeMetier/corpsDeMetier.component';
*/
import { InterventionsComponent } from "./interventions/interventions.component";

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: 'interventions', component: InterventionsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
