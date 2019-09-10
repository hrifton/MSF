import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistoriqueAssetComponent } from './historique-asset/historique-asset.component';

const routes: Routes = [
  { path: '', redirectTo: 'asset', pathMatch: 'full' },
  { path: 'historique', component: HistoriqueAssetComponent }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetRoutingModule { }
