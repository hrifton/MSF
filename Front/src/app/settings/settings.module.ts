import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { AssetComponent } from './asset/asset.component';
import { PapaParseModule } from 'ngx-papaparse';

import { AutoCompleteAllModule, MultiSelectAllModule, DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';

import { NumericTextBoxAllModule, NumericTextBoxModule, UploaderModule } from '@syncfusion/ej2-angular-inputs';

import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

import { DatePickerAllModule, DatePickerModule, DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';

import { DialogAllModule, DialogModule } from '@syncfusion/ej2-angular-popups';

import { GridAllModule } from '@syncfusion/ej2-angular-grids';

import { TabAllModule } from '@syncfusion/ej2-angular-navigations';
import { RecurrenceEditor, ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { CheckBoxModule, RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import { ChartModule, AccumulationChartModule } from '@syncfusion/ej2-angular-charts';
import { DashboardLayoutModule } from '@syncfusion/ej2-angular-layouts';
import { MaintenancesRoutingModule } from '../maintenances/maintenances-routing.module';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, MatInputModule, MatSelectModule, MatRadioModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
//import { AssetModule } from './asset/asset.module';
import { HistoriqueAssetComponent } from './asset/historique-asset/historique-asset.component';


@NgModule({
  declarations: [SettingsComponent,
    MaintenanceComponent,
    AssetComponent,
  HistoriqueAssetComponent],
  imports: [CheckBoxModule, UploaderModule, DialogModule, FormsModule, CommonModule, ReactiveFormsModule,
    MultiSelectAllModule,
    PapaParseModule,
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
    NumericTextBoxAllModule, TabAllModule, GridAllModule, DialogAllModule, DatePickerAllModule, DropDownListModule, AutoCompleteAllModule,
    CommonModule,
    SettingsRoutingModule,
    //AssetModule
  ]
})
export class SettingsModule { }
