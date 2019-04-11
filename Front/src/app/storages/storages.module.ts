import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoragesRoutingModule } from './storages-routing.module';
import { StoragesComponent } from './storages.component';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  declarations: [StoragesComponent],
  imports: [
    CommonModule,
    StoragesRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule
  ]
})
export class StoragesModule { }
