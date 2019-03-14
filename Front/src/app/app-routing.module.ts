import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormulaireInterventionComponent } from './intervention/formulaire-intervention/formulaire-intervention.component';
import { ListeInterventionComponent } from './intervention/liste-intervention/liste-intervention.component';
import { SettingDepartementComponent } from './setting/departement/setting-departement/setting-departement.component';

const routes: Routes = [
  { path: 'formInter', component: FormulaireInterventionComponent },
  { path: 'listInter', component: ListeInterventionComponent },
  { path: 'setDep', component: SettingDepartementComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
