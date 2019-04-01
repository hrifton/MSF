import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormulaireInterventionComponent } from './intervention/formulaire-intervention/formulaire-intervention.component';
import { ListeInterventionComponent } from './intervention/liste-intervention/liste-intervention.component';
import { DepartementComponent } from './setting/departement/departement.component';
import { TechnicienComponent } from './setting/technicien/technicien.component';
import { CorpsDeMetierComponent } from './setting/corpsDeMetier/corpsDeMetier.component';

const routes: Routes = [
  {path: '', redirectTo: 'formInter', pathMatch: 'full'},
  { path: 'formInter', component: FormulaireInterventionComponent },
  { path: 'listInter', component: ListeInterventionComponent },
  { path: 'setDep', component: DepartementComponent },
  { path: 'setTec', component: TechnicienComponent },
  { path: 'setMet', component: CorpsDeMetierComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
