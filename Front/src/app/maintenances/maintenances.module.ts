import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintenancesRoutingModule } from './maintenances-routing.module';
import { MaintenancesComponent } from './maintenances.component';
import { MatGridListModule,  MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, MatInputModule, MatSelectModule, MatRadioModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [MaintenancesComponent],
  imports: [
    CommonModule,
    MaintenancesRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule
  ]
})
export class MaintenancesModule { }
