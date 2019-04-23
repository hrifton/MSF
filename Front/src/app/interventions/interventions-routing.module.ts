import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResolutionInterventionComponent } from './resolution-intervention/resolution-intervention.component';
import { InterventionsComponent } from './interventions.component';
import { ListeInterventionComponent } from '../intervention/liste-intervention/liste-intervention.component';
import { FormulaireInterventionComponent } from '../intervention/formulaire-intervention/formulaire-intervention.component';
import { HistoricInterventionComponent } from './historic-intervention/historic-intervention.component';
import { HistoricSolutionComponent } from './historic-solution/historic-solution.component';


const routes: Routes = [
  {
    path: 'interventions',
    component: InterventionsComponent,
    children: [
      { path: '', component: ListeInterventionComponent },
      { path: 'formulaires', component: FormulaireInterventionComponent },
      { path: 'historic', component: HistoricInterventionComponent },
      { path: 'historic-solution', component: HistoricSolutionComponent },
      { path: 'resolution', component: ResolutionInterventionComponent }
    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterventionsRoutingModule { }
