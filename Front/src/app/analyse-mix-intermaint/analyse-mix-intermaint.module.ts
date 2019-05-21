import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyseMixIntermaintComponent } from './analyse-mix-inter-maint.component';
import { AnalyseInterventionComponent } from './analyse-intervention/analyse-intervention.component';
import { AnalyseMaintenanceComponent } from './analyse-maintenance/analyse-maintenance.component';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { AccumulationChartModule } from '@syncfusion/ej2-angular-charts';
@NgModule({
  imports: [
    CommonModule, TabModule, AccumulationChartModule
  ],
  declarations: [AnalyseMixIntermaintComponent, AnalyseInterventionComponent, AnalyseMaintenanceComponent],
  exports:[AnalyseMixIntermaintComponent, AnalyseInterventionComponent, AnalyseMaintenanceComponent]
})
export class AnalyseMixIntermaintModule { }
