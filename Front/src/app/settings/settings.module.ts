import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { AssetComponent } from './asset/asset.component';


import { AutoCompleteAllModule } from '@syncfusion/ej2-angular-dropdowns';

import { NumericTextBoxAllModule } from '@syncfusion/ej2-angular-inputs';

import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

import { DatePickerAllModule } from '@syncfusion/ej2-angular-calendars';

import { DialogAllModule } from '@syncfusion/ej2-angular-popups';

import { GridAllModule } from '@syncfusion/ej2-angular-grids';

import { TabAllModule } from '@syncfusion/ej2-angular-navigations';


@NgModule({
  declarations: [SettingsComponent,
    MaintenanceComponent,
    AssetComponent],
  imports: [
    NumericTextBoxAllModule, TabAllModule, GridAllModule, DialogAllModule, DatePickerAllModule, DropDownListModule, AutoCompleteAllModule,
    CommonModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
