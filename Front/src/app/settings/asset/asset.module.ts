import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetRoutingModule } from './asset-routing.module';
import { HistoriqueAssetComponent } from './historique-asset/historique-asset.component';

@NgModule({
  declarations: [HistoriqueAssetComponent],
  imports: [
    CommonModule,
    AssetRoutingModule
  ]
})
export class AssetModule { }
