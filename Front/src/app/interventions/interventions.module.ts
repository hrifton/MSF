import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

// Outils

import { GridAllModule } from "@syncfusion/ej2-angular-grids";
import { MatInputModule } from "@angular/material";
import { ToastModule } from '@syncfusion/ej2-angular-notifications';

// Chart
import {
  ChartModule,
  PieSeriesService,
  AccumulationLegendService,
  AccumulationTooltipService,
  AccumulationDataLabelService,
  AccumulationAnnotationService
} from "@syncfusion/ej2-angular-charts";
import { AccumulationChartModule } from "@syncfusion/ej2-angular-charts";
import {
  CategoryService,
  LegendService,
  TooltipService
} from "@syncfusion/ej2-angular-charts";
import {
  DataLabelService,
  LineSeriesService
} from "@syncfusion/ej2-angular-charts";
import { AnalyseMixIntermaintModule } from "../analyse-mix-intermaint/analyse-mix-intermaint.module";

// Vue Component Child
import { InterventionsRoutingModule } from "./interventions-routing.module";
import { InterventionsComponent } from "./interventions.component";
import { ListInterventionComponent } from "./list-intervention/list-intervention.component";
import { FormulaireInterventionComponent } from "./formulaire-intervention/formulaire-intervention.component";
import { ResolutionInterventionComponent } from "./resolution-intervention/resolution-intervention.component";

import { MatDatepickerModule, MatNativeDateModule } from "@angular/material";
import { ReactiveFormsModule } from "@angular/forms";
import { NumericTextBoxAllModule } from "@syncfusion/ej2-angular-inputs";
import { DatePickerAllModule } from "@syncfusion/ej2-angular-calendars";
import { DropDownListAllModule } from "@syncfusion/ej2-angular-dropdowns";
import {
  EditService,
  ToolbarService,
  PageService
} from "@syncfusion/ej2-angular-grids";
import { ButtonModule, CheckBoxModule , RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
import {
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatSelectModule,
  MatRadioModule
} from "@angular/material";

@NgModule({
  declarations: [
    InterventionsComponent,
    ListInterventionComponent,
    FormulaireInterventionComponent,
    ResolutionInterventionComponent
  ],
  imports: [
    ButtonModule,
    ToastModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    AnalyseMixIntermaintModule,
    ChartModule,
    NumericTextBoxAllModule,
    AccumulationChartModule,
    GridAllModule,
    DropDownListAllModule,
    DatePickerAllModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatInputModule,
    InterventionsRoutingModule,
    BrowserModule
  ],
  providers: [
    EditService,
    ToolbarService,
    PageService,
    CategoryService,
    LegendService,
    TooltipService,
    DataLabelService,
    LineSeriesService,
    PieSeriesService,
    AccumulationLegendService,
    AccumulationTooltipService,
    AccumulationDataLabelService,
    AccumulationAnnotationService
  ],
  exports: [MatDatepickerModule, MatNativeDateModule]
})
export class InterventionsModule {}
