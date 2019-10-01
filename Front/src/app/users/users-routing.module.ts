import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfilComponent } from './profil/profil.component';
import { UsersComponent } from './users.component';


const routes: Routes = [

  {    path: 'user',  component: UsersComponent,
      children: [
      { path: 'profil', component: ProfilComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
