import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResolutionInterventionComponent } from './resolution-intervention/resolution-intervention.component';
import { InterventionsComponent } from './interventions.component';



import { ListInterventionComponent } from './list-intervention/list-intervention.component';
import { FormulaireInterventionComponent } from './formulaire-intervention/formulaire-intervention.component';
import { AnalyseMixIntermaintComponent } from '../analyse-mix-intermaint/analyse-mix-inter-maint.component';
import { AnalyseMaintenanceComponent } from '../analyse-mix-intermaint/analyse-maintenance/analyse-maintenance.component';


const routes: Routes = [
  {
    path: 'interventions',
    component: InterventionsComponent,
    children: [
      { path: '', component: ListInterventionComponent },
      { path: 'formulaires', component: FormulaireInterventionComponent },
      { path: 'analyseMaintenance', component: AnalyseMaintenanceComponent },
    
      { path: 'resolution', component: ResolutionInterventionComponent }
      
    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterventionsRoutingModule { }
