import { FormulaireComponent } from "./formulaire/formulaire.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardLayoutModule } from "@syncfusion/ej2-angular-layouts";
import {
  ChartModule,
  AccumulationChartModule
} from "@syncfusion/ej2-angular-charts";
import { RadioButtonModule } from '@syncfusion/ej2-angular-buttons';

import { MaintenancesRoutingModule } from "./maintenances-routing.module";
import { MaintenancesComponent } from "./maintenances.component";
import { ScheduleModule } from "@syncfusion/ej2-angular-schedule";
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService } from '@syncfusion/ej2-angular-schedule';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import {
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatSelectModule,
  MatRadioModule
} from "@angular/material";
import { LayoutModule } from "@angular/cdk/layout";
import { ReactiveFormsModule } from "@angular/forms";
import { CalendrierComponent } from "./calendrier/calendrier.component";
import { DateTimePickerModule } from "@syncfusion/ej2-angular-calendars";
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';

@NgModule({
  declarations: [
    MaintenancesComponent,
    FormulaireComponent,
    CalendrierComponent
  ],
  imports: [DatePickerModule,
    NumericTextBoxModule,
    DropDownListAllModule,
    RadioButtonModule,
    ChartModule,
    AccumulationChartModule,
    ScheduleModule,
    DateTimePickerModule,
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
    ReactiveFormsModule,
  ],

})
export class MaintenancesModule { }
