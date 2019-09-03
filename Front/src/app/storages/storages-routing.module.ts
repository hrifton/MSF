import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoragesComponent } from './storages.component';

const routes: Routes = [
  {
    path: 'storage',
    component: StoragesComponent,
    children: [
      { path: '', component: StoragesComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoragesRoutingModule { }
