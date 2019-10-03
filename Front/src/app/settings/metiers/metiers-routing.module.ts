import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';
import { ListMetiersComponent } from './list-metiers/list-metiers.component';
import { ListCategorieComponent } from './list-categorie/list-categorie.component';
import { FormulaireMetierComponent } from './formulaire-metier/formulaire-metier.component';
import { FormulaireCategorieComponent } from './formulaire-categorie/formulaire-categorie.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'metier',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  { path: 'listeMetier', component: ListMetiersComponent },
  { path: 'listeMetier', component: ListCategorieComponent },
  { path: 'formMetier', component: FormulaireMetierComponent },
  { path: 'formCategorie', component: FormulaireCategorieComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MetiersRoutingModule { }
