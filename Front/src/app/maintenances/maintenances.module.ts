import { FormulaireComponent } from "./formulaire/formulaire.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardLayoutModule } from "@syncfusion/ej2-angular-layouts";
import { CheckBoxModule,RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { ChartModule, AccumulationChartModule} from "@syncfusion/ej2-angular-charts";
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { MaintenancesRoutingModule } from "./maintenances-routing.module";
import { MaintenancesComponent } from "./maintenances.component";
import { ScheduleModule } from "@syncfusion/ej2-angular-schedule";
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService } from '@syncfusion/ej2-angular-schedule';
import { DropDownListAllModule,MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DropDownButtonModule, SplitButtonModule, ProgressButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { ToastModule } from '@syncfusion/ej2-angular-notifications';
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
  imports: [ToastModule,
    SplitButtonModule, 
    ProgressButtonModule,
    DropDownButtonModule,
    DialogModule,
    MultiSelectAllModule,
    CheckBoxModule,
    DatePickerModule,
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
