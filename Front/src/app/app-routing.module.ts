import { AuthGuard } from "./auth/auth.guard";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

/**
 * importation des component mere de chaque module
 */
import { MaintenancesComponent } from "./maintenances/maintenances.component";
import { InterventionsComponent } from "./interventions/interventions.component";
import { LoginComponent } from "./login/login.component";
import { UserComponent } from "./user/user.component";
import { SettingsComponent } from "./settings/settings.component";
import { MsalGuard } from "@azure/msal-angular";
// import { HistoricComponent } from './historic/historic.component';
// import { DepartementComponent } from './setting/departement/departement.component';
// import { TechnicienComponent } from './setting/technicien/technicien.component';
// import { CorpsDeMetierComponent } from './setting/corpsDeMetier/corpsDeMetier.component';

/**
 * Routes vers entrée de chaque component
 * canActivate securisation d'acces a la route selon l'authentification et au niveau de droit
 */

/**
 * Routes vers entrée de chaque component
 * canActivate securisation d'acces a la route selon l'authentification et au niveau de droit
 */

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  // { path: 'signUp', component: UserComponent },
  { path: "login", component: LoginComponent },
  // TODO on le retire plus de logOut
  {
    path: "interventions",
    component: InterventionsComponent
    //canActivate: [MsalGuard]
  },
  {
    path: "maintenances",
    component: MaintenancesComponent
    //canActivate: [MsalGuard]
  },
  // { path: 'historic', component: HistoricComponent, canActivate: [AuthGuard]},
  // { path: 'setTec', component: TechnicienComponent, canActivate: [AuthGuard] },
  // { path: 'setMet', component: CorpsDeMetierComponent, canActivate: [AuthGuard] },
  {
    path: "settings",
    component: SettingsComponent
    //canActivate: [MsalGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
