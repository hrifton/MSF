import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';
import { ListMetiersComponent } from './list-metiers/list-metiers.component';

const routes: Routes = [
  {path: '', redirectTo: 'metier', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'listeMetier', component: ListMetiersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MetiersRoutingModule { }
