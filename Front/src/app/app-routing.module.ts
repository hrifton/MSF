import { AuthGuard } from './auth/auth.guard';
import { MaintenancesComponent } from './maintenances/maintenances.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/*import { FormulaireInterventionComponent } from './intervention/formulaire-intervention/formulaire-intervention.component';
import { ListeInterventionComponent } from './intervention/liste-intervention/liste-intervention.component';
import { DepartementComponent } from './setting/departement/departement.component';
import { TechnicienComponent } from './setting/technicien/technicien.component';
import { CorpsDeMetierComponent } from './setting/corpsDeMetier/corpsDeMetier.component';
*/
import { InterventionsComponent } from './interventions/interventions.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';



const routes: Routes = [
  {path: '', redirectTo: 'signUp', pathMatch: 'full'},
  { path: 'signUp', component: UserComponent},
  { path: 'login', component: LoginComponent},
  { path: 'interventions', component: InterventionsComponent,canActivate:[AuthGuard] },
  { path: 'maintenances', component: MaintenancesComponent,canActivate:[AuthGuard] },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
