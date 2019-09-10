import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { AssetComponent } from './asset/asset.component';
import { HospitalComponent } from './hospital/hospital.component';

const routes: Routes = [
  { path: "", redirectTo: "settings", pathMatch: "full" },
  { path: "settings", component: SettingsComponent },
  { path: "maintenance", component: MaintenanceComponent },
  { path: "hospital", component: HospitalComponent },
  { path: "asset", component: AssetComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule] 
})
export class SettingsRoutingModule { }
