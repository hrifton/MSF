import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalyseComponent } from './analyse.component';

/**
 * Routing
 */
const routes: Routes = [
  {
    path: "analyse",
    component: AnalyseComponent,

    children: [
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalyseRoutingModule { }
