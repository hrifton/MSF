import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MetiersRoutingModule } from './metiers-routing.module';

import { MetiersComponent } from './metiers.component';
import { ListMetiersComponent } from './list-metiers/list-metiers.component';

@NgModule({
  declarations: [MetiersComponent, ListMetiersComponent],
  imports: [CommonModule, MetiersRoutingModule],
  exports: [MetiersComponent]
})
export class MetiersModule {}
