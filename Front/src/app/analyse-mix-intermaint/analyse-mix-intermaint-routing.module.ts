import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AnalyseMixIntermaintComponent } from './analyse-mix-inter-maint.component';
import { AnalyseMaintenanceComponent } from './analyse-maintenance/analyse-maintenance.component';
import { AnalyseInterventionComponent } from './analyse-intervention/analyse-intervention.component';


const routes: Routes = [
  {
    path: 'analyse',
    component: AnalyseMixIntermaintComponent,
    children: [
      { path: 'analyseIntervention', component: AnalyseInterventionComponent },
      { path: 'analyseMaintenance', component: AnalyseMaintenanceComponent },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalyseRoutingModule { }
