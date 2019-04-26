import { FormulaireComponent } from './formulaire/formulaire.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardLayoutModule } from '@syncfusion/ej2-angular-layouts';
import { ChartModule,AccumulationChartModule } from '@syncfusion/ej2-angular-charts';

import { MaintenancesRoutingModule } from './maintenances-routing.module';
import { MaintenancesComponent } from './maintenances.component';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';

import { MatGridListModule,  MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, MatInputModule, MatSelectModule, MatRadioModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendrierComponent } from './calendrier/calendrier.component';


@NgModule({
  declarations: [MaintenancesComponent,FormulaireComponent, CalendrierComponent],
  imports: [ChartModule,AccumulationChartModule,ScheduleModule,
    DashboardLayoutModule,
    CommonModule,
    MaintenancesRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule
  ]
})
export class MaintenancesModule { }
