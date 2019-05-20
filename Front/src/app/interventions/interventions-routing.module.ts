import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResolutionInterventionComponent } from './resolution-intervention/resolution-intervention.component';
import { InterventionsComponent } from './interventions.component';

import { HistoricInterventionComponent } from './historic-intervention/historic-intervention.component';
import { HistoricSolutionComponent } from './historic-solution/historic-solution.component';
import { ListInterventionComponent } from './list-intervention/list-intervention.component';
import { FormulaireInterventionComponent } from './formulaire-intervention/formulaire-intervention.component';


const routes: Routes = [
  {
    path: 'interventions',
    component: InterventionsComponent,
    children: [
      { path: '', component: ListInterventionComponent },
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
