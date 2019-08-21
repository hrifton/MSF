import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { MaintenancesComponent } from './maintenances/maintenances.component';
import { InterventionsComponent } from './interventions/interventions.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { SettingsComponent } from './settings/settings.component';
//import { HistoricComponent } from './historic/historic.component';
//import { DepartementComponent } from './setting/departement/departement.component';
//import { TechnicienComponent } from './setting/technicien/technicien.component';
//import { CorpsDeMetierComponent } from './setting/corpsDeMetier/corpsDeMetier.component';



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'signUp', component: UserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'interventions', component: InterventionsComponent, canActivate: [AuthGuard] },
  { path: 'maintenances', component: MaintenancesComponent, canActivate: [AuthGuard] },
  //{ path: 'historic', component: HistoricComponent, canActivate: [AuthGuard]},
  //{ path: 'setTec', component: TechnicienComponent, canActivate: [AuthGuard] },
  //{ path: 'setMet', component: CorpsDeMetierComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
