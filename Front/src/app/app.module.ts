//Guard protection Route
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
//Connexion Msal Graph Microsoft
import { MsalModule } from '@azure/msal-angular';
import { OAuthSettings } from './auth/oauth';
// Imports
// import {SplitButtonModule} from 'primeng/splitbutton';
import { BrowserModule } from '@angular/platform-browser';
/// CodAffection
import { FormsModule } from '@angular/forms';

import {
  ButtonModule,
  CheckBoxModule} from '@syncfusion/ej2-angular-buttons';
import { DatePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import {
  NumericTextBoxAllModule,
  ColorPickerModule
} from '@syncfusion/ej2-angular-inputs';
import {
  SplitButtonModule} from '@syncfusion/ej2-angular-splitbuttons';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { ToastModule } from '@syncfusion/ej2-angular-notifications';
////
import { NgModule } from '@angular/core';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatProgressSpinnerModule
} from '@angular/material';
import {
  MatMenuModule,
  MatInputModule,
  MatSelectModule,
  MatCardModule
} from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


// Providers

import { HttpModule } from '@angular/http';

// Component Declaration
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

import { InterventionsModule } from './interventions/interventions.module';
import { MaintenancesModule } from './maintenances/maintenances.module';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { UsersModule } from './users/users.module';
import { SettingsModule } from './settings/settings.module';
import { AnalyseModule } from './analyse/analyse.module';

//import { HistoricModule } from "./historic/historic.module";
//import { HistoricComponent } from "./historic/historic.component";

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    UserComponent,
    SignUpComponent
    //HistoricComponent
  ],
  imports: [
    //SwitchModule,
    //ProgressButtonModule,
    //AccordionModule,
   // UploaderModule,
    DialogModule,
    CheckBoxModule,
    HttpModule,
    ToastModule,
    FormsModule,
    //FlexLayoutModule,
    //JsonpModule,
    //GridAllModule,
    ButtonModule,
    NumericTextBoxAllModule,
    DropDownListAllModule,
    DatePickerAllModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    ReactiveFormsModule,
    ColorPickerModule,
    MatGridListModule,
    SlimLoadingBarModule,
    HttpClientModule,
    NgbModule,
    SplitButtonModule,
    InterventionsModule,
    MaintenancesModule,
    UsersModule,
    SettingsModule,
    MsalModule.forRoot({
      clientID: OAuthSettings.appId
    }),
    AnalyseModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
