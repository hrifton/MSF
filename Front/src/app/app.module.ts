import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
// Imports
import {SplitButtonModule} from 'primeng/splitbutton';
import { BrowserModule } from '@angular/platform-browser';
///CodAffection
import { FormsModule} from '@angular/forms';




////
import { NgModule } from '@angular/core';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { MatMenuModule, MatInputModule, MatSelectModule, MatRadioModule, MatCardModule, MatDividerModule} from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import { RadioButtonModule } from '@syncfusion/ej2-angular-buttons';
// import { GridModule, EditService, ToolbarService, PageService, SortService, FilterService, GroupService } from '@syncfusion/ej2-angular-grids';
import { DatePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { NumericTextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { FlexLayoutModule } from '@angular/flex-layout';


// Providers

import { HttpModule, JsonpModule } from '@angular/http';

// Component Declaration
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

import {MatTableModule} from '@angular/material/table';

import { DepartementComponent } from './setting/departement/departement.component';
import { SettingDepartementComponent } from './setting/departement/setting-departement/setting-departement.component';
import { ListeDepartementComponent } from './setting/departement/liste-departement/liste-departement.component';
import { TechnicienComponent } from './setting/technicien/technicien.component';
import { SettingTechnicienComponent } from './setting/technicien/setting-technicien/setting-technicien.component';
import { CorpsDeMetierComponent } from './setting/corpsDeMetier/corpsDeMetier.component';
import { SettingMetierComponent } from './setting/corpsDeMetier/setting-metier/setting-metier.component';
import { ListeCorpMetierComponent } from './setting/corpsDeMetier/liste-corpMetier/liste-corpMetier.component';
import { InterventionsModule } from './interventions/interventions.module';
import { AnalyseMixIntermaintModule } from './analyse-mix-intermaint/analyse-mix-intermaint.module';
import { MaintenancesModule } from './maintenances/maintenances.module';
import { StoragesModule } from './storages/storages.module';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { from } from 'rxjs';
import { UsersModule } from './users/users.module';



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    DepartementComponent,
    SettingDepartementComponent,
    ListeDepartementComponent,
    TechnicienComponent,
    SettingTechnicienComponent,
    CorpsDeMetierComponent,
    SettingMetierComponent,
    ListeCorpMetierComponent,
    LoginComponent,
    UserComponent,
    SignUpComponent

  ],
  imports: [HttpModule,
    FormsModule,
    FlexLayoutModule,
    JsonpModule,
    GridAllModule,
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
    // GridModule,
    InterventionsModule,
    AnalyseMixIntermaintModule,
    MaintenancesModule,
    StoragesModule,
    UsersModule,
  ],
  providers:[{
              provide:HTTP_INTERCEPTORS,
              useClass:AuthInterceptor,
              multi:true
  },AuthGuard],
  // providers: [
  //  ToolbarService,
    // EditService,
    // InterventionService,
    // PageService,
     // SortService,
      // FilterService,
       // GroupService
    //  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
