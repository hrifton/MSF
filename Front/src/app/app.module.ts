//Imports
import {SplitButtonModule} from 'primeng/splitbutton';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { MatMenuModule, MatInputModule, MatSelectModule, MatRadioModule, MatCardModule, MatDividerModule} from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import { GridModule,EditService,ToolbarService,PageService, SortService, FilterService, GroupService } from '@syncfusion/ej2-angular-grids';
import { DatePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { NumericTextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
//Providers
import { InterventionService } from './intervention/intervention.service';


//Component Declaration
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FormulaireInterventionComponent } from './intervention/formulaire-intervention/formulaire-intervention.component';
import {MatTableModule} from '@angular/material/table';
import { ListeInterventionComponent } from './intervention/liste-intervention/liste-intervention.component';
import { SettingDepartementComponent } from './setting/departement/setting-departement/setting-departement.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FormulaireInterventionComponent,
    ListeInterventionComponent,
    SettingDepartementComponent,

  ],
  imports: [
    ButtonModule,
    NumericTextBoxAllModule,
    DropDownListAllModule,
    DatePickerAllModule,
    TreeGridModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatGridListModule,
    SlimLoadingBarModule,
    HttpClientModule,
    MatTabsModule,
    DragDropModule,
    MatDividerModule,
    NgbModule,
    MatTableModule,
    SplitButtonModule,
    GridModule,
  ],
  providers: [
    ToolbarService,
    EditService,
    InterventionService,
    PageService,
     SortService,
      FilterService,
       GroupService
      ],
  bootstrap: [AppComponent]
})
export class AppModule { }
