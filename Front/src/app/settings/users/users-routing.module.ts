import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "../../auth/auth.guard";
import { ListeUsersComponent } from './liste-users/liste-users.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "user",
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {path:'listeUsers',component: ListeUsersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
