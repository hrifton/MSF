//#region Import
import { DateMaintenanceService } from './../Service/dateMaintenance.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MaintenanceService } from '../Service/maintenance.service';
import { Maintenance } from '../Class/Maintenance';
import { DateMaintenance } from '../Class/DateMaintenance';
import { CalendrierComponent } from './calendrier/calendrier.component';
//#endregion

@Component({
  selector: 'app-maintenances',
  templateUrl: './maintenances.component.html'
  // styleUrls: ['./maintenances.component.css']
})
export class MaintenancesComponent implements OnInit {
  maintenance: any;
  datemaitenance: DateMaintenance[];
  public lrepeat: { [key: string]: Object }[] = [
    { repeat: 'Never' },
    { repeat: 'Daily' },
    { repeat: 'Weekly' },
    { repeat: 'Monthly' },
    { repeat: 'Yearly' }
  ];
  public lEnd: { [key: string]: Object }[] = [
    { end: 'Never' },
    { end: 'Until' },
    { end: 'Count' }
  ];

  @ViewChild(CalendrierComponent)
  calendrier: CalendrierComponent;

  constructor(
    private ms: MaintenanceService,
    private dms: DateMaintenanceService
  ) {
    this.maintenance = [];
    this.datemaitenance = [];

    this.dms.getDateMaintenance().subscribe((data: DateMaintenance[]) => {
      this.datemaitenance = data;
    });

    this.ms.getMaintenance().subscribe((data: Maintenance[]) => {
      this.maintenance = data;
    });

    console.log('compoment parent: Constructor');
  }
  // TODO Hicham multi requet
  saveMaintenance($event) {
    this.dms.postDateMaintenance($event);
    this.datemaitenance.push($event);
    this.calendrier.refreshAgenda();
  }
  // mise ajout de la variable apres modification dans le componenent enfant
  deleteMaintenance($event) {
    this.datemaitenance = $event;
  }
  ngOnInit() {}
}
