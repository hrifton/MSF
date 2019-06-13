import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoricRoutingModule } from './historic-routing.module';
import { HistoricByassetComponent } from './historic-byasset/historic-byasset.component';

@NgModule({
  declarations: [HistoricByassetComponent],
  imports: [
   
    CommonModule,
    HistoricRoutingModule
  ]
})
export class HistoricModule { }
 