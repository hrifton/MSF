import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';


// Outils

import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { MatToolbarModule,  MatSidenavModule, MatListModule, MatSelectModule } from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DialogEditEventArgs, SaveEventArgs, EditSettingsModel, ToolbarItems } from '@syncfusion/ej2-angular-grids';


// Chart
import { ChartModule, PieSeriesService, AccumulationLegendService, AccumulationTooltipService, AccumulationDataLabelService, AccumulationAnnotationService } from '@syncfusion/ej2-angular-charts';
import { AccumulationChartModule } from '@syncfusion/ej2-angular-charts';
import { CategoryService, LegendService, TooltipService } from '@syncfusion/ej2-angular-charts';
import { DataLabelService, LineSeriesService} from '@syncfusion/ej2-angular-charts';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import{ AnalyseMixIntermaintModule} from '../analyse-mix-intermaint/analyse-mix-intermaint.module';

// Vue Component Child
import { InterventionsRoutingModule } from './interventions-routing.module';
import { InterventionsComponent } from './interventions.component';
import { ListInterventionComponent } from './list-intervention/list-intervention.component';
import { FormulaireInterventionComponent } from './formulaire-intervention/formulaire-intervention.component';
import { ResolutionInterventionComponent } from './resolution-intervention/resolution-intervention.component';

import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule } from '@angular/forms';
import { NumericTextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { DatePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { GridModule, EditService, ToolbarService, PageService } from '@syncfusion/ej2-angular-grids';


@NgModule({
  declarations: [InterventionsComponent,
      ListInterventionComponent,
       FormulaireInterventionComponent,
        ResolutionInterventionComponent,
       ],
  imports: [
    
    AnalyseMixIntermaintModule,
    TabModule,
    CommonModule,
    ChartModule,
    GridModule,
    NumericTextBoxAllModule,
    AccumulationChartModule,
    GridAllModule,
    DropDownListAllModule,
    DatePickerAllModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatSelectModule,
    MatInputModule,
    InterventionsRoutingModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatToolbarModule,
    MatGridListModule,
    MatListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    BrowserModule
  ],
  providers: [EditService, ToolbarService, PageService, CategoryService, LegendService, TooltipService,
    DataLabelService, LineSeriesService, PieSeriesService, AccumulationLegendService, AccumulationTooltipService, AccumulationDataLabelService,
      AccumulationAnnotationService],
  exports: [FormulaireInterventionComponent,
    MatDatepickerModule, MatNativeDateModule,AnalyseMixIntermaintModule],
})
export class InterventionsModule { }
