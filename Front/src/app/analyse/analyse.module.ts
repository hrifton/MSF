import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyseRoutingModule } from './analyse-routing.module';
import { AnalyseComponent } from '../analyse/analyse.component';

@NgModule({
  declarations: [AnalyseComponent],
  imports: [
    CommonModule,
    AnalyseRoutingModule
  ]
})
export class AnalyseModule { }
